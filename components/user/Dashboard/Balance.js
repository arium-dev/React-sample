import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import income from "../../../images/income.png";
import outcome from "../../../images/outcome.png";
import {
  ACCOUNT,
  BSB,
  CURRENCY,
  GENERATE_DEPOSIT_BANK,
  TOTAL_BALANCE,
  TOTAL_RECEIVED,
  TOTAL_SENT,
} from "./constants";
import UseUserWallet from "../../../hooks/UseUserWallet";
import UseUserBalance from "../../../hooks/UseUserBalance";
import {
  fetchIncomeOutcome,
  generateDepositWallet,
  initialIncomeOutcomeValues,
} from "./helper";
import Spinner from "../../shared/Spinner";
import { Row, Col } from "react-bootstrap";
import { FormatTwoDecimals } from "../../../utils";

const Balance = () => {
  const [incomeOutcome, setIncomeOutcome] = useState(
    initialIncomeOutcomeValues
  );
  const [depositalletLoading, setDepositalletLoading] = useState(false);
  const { userWallet, loading: walletLoading, refresh } = UseUserWallet();
  const { balance, loading: balanceLoading } = UseUserBalance();

  useEffect(() => {
    fetchIncomeOutcome(setIncomeOutcome);
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="">
        <Row className="">
          <Col xxl={4} xl={4} lg={4} md={6} className="virtual-card-col">
            <div className="virtual-card-container">
              {walletLoading || depositalletLoading ? (
                <div className="user-dashboard-card-loader">
                  <Spinner color="white" variant={"primary"} size={28} />
                </div>
              ) : !userWallet?.deposit?.accountNumber ? (
                <div className="h-100 d-flex align-items-end">
                  <div className="d-flex flex-row align-items-center p-2 px-4 generate-bank-btn cursor-pointer">
                    <i className="fa fa-plus fa-md text-primary" />
                    <span
                      className="fs-lg fw-semibold ms-2 text-primary"
                      onClick={() =>
                        generateDepositWallet(refresh, setDepositalletLoading)
                      }
                    >
                      {GENERATE_DEPOSIT_BANK}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="card-user-dashboard">
                  <p className="m-0">
                    {userWallet?.deposit?.bsb && (
                      <>
                        {BSB} {userWallet?.deposit?.bsb}
                      </>
                    )}
                  </p>
                  <p className="m-0">
                    {userWallet?.deposit?.accountNumber && (
                      <>
                        {ACCOUNT} {userWallet?.deposit?.accountNumber}
                      </>
                    )}
                  </p>
                  <h3 className="mt-2 text-white">
                    {userWallet?.deposit?.accountTitle}
                  </h3>
                </div>
              )}
            </div>
          </Col>

          <Col xxl={4} xl={4} lg={4} md={6} className="">
            <Card>
              <Card.Body className="">
                <Card.Title>
                  <p className="text-secondary fw-semibold">{TOTAL_BALANCE}</p>
                </Card.Title>
                <Card.Text>
                  <div
                    className={
                      balanceLoading
                        ? "balance-amount-loading"
                        : "balance-amount-bg"
                    }
                  >
                    {balanceLoading ? (
                      <div className="d-flex justify-content-center">
                        <Spinner
                          color="primary"
                          variant={"primary"}
                          size={28}
                        />
                      </div>
                    ) : (
                      <div className="d-flex align-items-center justify-content-between flex-row w-100">
                        <h3 className="text-secondary fw-semibold m-0">
                          $
                          {balance &&
                            parseFloat(
                              FormatTwoDecimals(balance)
                            ).toLocaleString()}
                        </h3>
                        <h3 className="text-secondary fw-semibold m-0">
                          {CURRENCY}
                        </h3>
                      </div>
                    )}
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xxl={4} xl={4} lg={4} md={6} className="">
            <div className="d-flex gap-4">
              <div className="income-outcome-user-dashboard">
                <Card>
                  <Card.Body>
                    <Card.Text>
                      <div className="my-4">
                        <div className="d-flex flex-column justify-content-center align-items-center">
                          <div className="d-flex justify-content-center align-items-center flex-column gap-1">
                            <img
                              src={outcome}
                              alt="outcome"
                              height="50px"
                              width="50px"
                            />
                            <p className="text-muted fw-normal m-0 text-center">
                              {TOTAL_SENT}
                            </p>
                            <>
                              {incomeOutcome.loading ? (
                                <Spinner
                                  color="primary"
                                  variant={"primary"}
                                  size={28}
                                />
                              ) : (
                                <h3 className="text-secondary fw-semibold m-0">
                                  {incomeOutcome?.data?.outcome
                                    ? `$${FormatTwoDecimals(incomeOutcome?.data?.outcome)}`
                                    : "$0"}
                                </h3>
                              )}
                            </>
                          </div>
                        </div>
                      </div>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>

              <div className="income-outcome-user-dashboard">
                <Card>
                  <Card.Body>
                    <Card.Text>
                      <div className="my-4">
                        <div className="d-flex flex-column justify-content-center align-items-center">
                          <div className="d-flex justify-content-center align-items-center flex-column gap-1">
                            <img
                              src={income}
                              alt="income"
                              height="50px"
                              width="50px"
                            />
                            <p className="text-muted fw-normal m-0">
                              {TOTAL_RECEIVED}
                            </p>
                            <>
                              {incomeOutcome.loading ? (
                                <Spinner
                                  color="primary"
                                  variant={"primary"}
                                  size={28}
                                />
                              ) : (
                                <h3 className="text-secondary fw-semibold m-0">
                                  {incomeOutcome?.data?.income
                                    ? `$${FormatTwoDecimals(incomeOutcome?.data?.income)}`
                                    : "$0"}
                                </h3>
                              )}
                            </>
                          </div>
                        </div>
                      </div>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Balance;
