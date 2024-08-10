import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Row, Card, Col } from "react-bootstrap";
import Button from "../../shared/Button";
import { CopyToClipBoardIcon } from "../../../icons";
import { handleDepositWallet, isCopiedInitialValues } from "./helper";
import AddBankAccount from "./AddBankAccount";
import { startCase } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserWallet, setUserWallet } from "../../../store/userWallet";
import Spinner from "../../shared/Spinner";
import EditBankMessage from "./EditBankMessage";
import { copyToClipboard } from "../../../utils";
import { GenericConstant } from "../../../utils/Constants";
import {
  ACCOUNT_NAME,
  BSB,
  ACCOUNT_NUMBER,
  DEPOSIT,
  WITHDRAW,
  EDIT_BANK_ACCOUNT,
  ADD_BANK_ACCOUNT,
  THIRTY_FIVE,
  GENERATE_BANK,
  _ACCOUNT_NAME,
  _BSB,
  _ACCOUNT_NUMBER,
  VIEW_HISTORY,
  WITHDRAWALS,
  ACCOUNT_TITLE,
  _DEPOSIT,
  _WITHDRAWALS,
  TYPE,
  CREATE_WITHDRAW,
} from "./constants";
import Fiat from "./Fiat";
import CreateFiatWithdraw from "./Fiat/CreateFiatWithdraw";

const Accounts = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [spin, setSpin] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [isOpenWithdraw, setIsOpenWithdraw] = useState(false);
  const [withdrawModal, setWithdrawModal] = useState(false);
  const [isCopied, setIsCopied] = useState(isCopiedInitialValues);

  const { data: userWallet, loading } = useSelector(
    (state) => state.userWallet
  );

  const depositBank = userWallet?.deposit;
  const withdrawBank = userWallet?.withdraw;

  const apiCount = useRef(0);
  useEffect(() => {
    if (
      !(userWallet?.deposit || userWallet?.withdraw) &&
      !loading &&
      apiCount.current < 3
    ) {
      apiCount.current += 1;
      dispatch(fetchUserWallet());
    }
  }, [dispatch, loading, userWallet]);

  const handleUpdateBankDetail = useCallback(
    (data) => {
      dispatch(setUserWallet(data));
    },
    [dispatch]
  );

  const handleOpenWithdrawMessage = useCallback(() => {
    setWithdrawModal((prev) => !prev);
  }, [setWithdrawModal]);

  const copyToClipboardHandler = (key, type) => {
    setIsCopied((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [key]: true,
      },
    }));

    if (key === ACCOUNT_NAME) {
      if (type === DEPOSIT) copyToClipboard(depositBank?.accountTitle);
      else copyToClipboard(withdrawBank?.accountTitle);
    } else if (key === BSB) {
      if (type === DEPOSIT) copyToClipboard(depositBank?.bsb);
      else copyToClipboard(withdrawBank?.bsb);
    } else if (key === ACCOUNT_NUMBER) {
      if (type === DEPOSIT) copyToClipboard(depositBank?.accountNumber);
      else copyToClipboard(withdrawBank?.accountNumber);
    }

    setTimeout(() => {
      setIsCopied((prev) => ({
        ...prev,
        [type]: {
          ...prev[type],
          [key]: false,
        },
      }));
    }, 6000);
  };

  const handleWithdrawModelClose = useCallback(() => {
    setIsOpenWithdraw(false);
  }, []);

  return searchParams.get(TYPE) ? (
    <Fiat type={searchParams.get(TYPE)} />
  ) : (
    <>
      <Row>
        <Col lg="6" md="12">
          <Card>
            <Card.Header className="py-4">
              <Card.Title>{_DEPOSIT}</Card.Title>
              {!(depositBank && depositBank.accountNumber) && !loading && (
                <Button
                  disabled={spin}
                  loading={spin}
                  className="font-sm generate-bank-btn"
                  variant="btn-primary light"
                  onClick={() =>
                    handleDepositWallet(
                      setSpin,
                      userWallet,
                      handleUpdateBankDetail
                    )
                  }
                >
                  {GENERATE_BANK}
                </Button>
              )}
            </Card.Header>
            <Card.Body>
              {loading ? (
                <div className="d-flex align-items-center justify-content-center w-100 h-100 pb-4">
                  <Spinner color="" size={THIRTY_FIVE} />
                </div>
              ) : (
                <>
                  <Card.Text className="d-flex justify-content-between align-items-center">
                    <p className="text-body fw-bold">{_ACCOUNT_NAME}</p>
                    <p className="text-body">
                      {depositBank?.accountTitle && (
                        <>
                          {isCopied.deposit.accountName ? (
                            <i class="las la-check-double fs-16 text-success mx-2" />
                          ) : (
                            <CopyToClipBoardIcon
                              className="cursor-pointer mx-2"
                              onClick={() => {
                                copyToClipboardHandler(ACCOUNT_NAME, DEPOSIT);
                              }}
                            />
                          )}
                        </>
                      )}

                      {startCase(depositBank?.accountTitle) || "- -"}
                    </p>
                  </Card.Text>
                  <Card.Text className="d-flex justify-content-between ">
                    <p className="text-body fw-bold">{_BSB}</p>
                    <p className="text-body">
                      {depositBank?.bsb && (
                        <>
                          {isCopied.deposit.bsb ? (
                            <i class="las la-check-double fs-16 text-success mx-2" />
                          ) : (
                            <CopyToClipBoardIcon
                              className="cursor-pointer mx-2"
                              onClick={() => {
                                copyToClipboardHandler(BSB, DEPOSIT);
                              }}
                            />
                          )}
                        </>
                      )}

                      {depositBank?.bsb || "- -"}
                    </p>
                  </Card.Text>
                  <Card.Text className="d-flex justify-content-between ">
                    <p className="text-body fw-bold">{_ACCOUNT_NUMBER}</p>
                    <p className="text-body">
                      {depositBank?.accountNumber && (
                        <>
                          {isCopied.deposit.accountNumber ? (
                            <i class="las la-check-double fs-16 text-success mx-2" />
                          ) : (
                            <CopyToClipBoardIcon
                              className="cursor-pointer mx-2"
                              onClick={() => {
                                copyToClipboardHandler(ACCOUNT_NUMBER, DEPOSIT);
                              }}
                            />
                          )}
                        </>
                      )}

                      {depositBank?.accountNumber || "- -"}
                    </p>
                  </Card.Text>
                </>
              )}
            </Card.Body>
            <Card.Footer className="text-center">
              <Card.Text className="text-dark">
                <Button
                  className="w-50 mx-auto"
                  variant="btn-primary"
                  onClick={() =>
                    setSearchParams({ type: GenericConstant._DEPOSIT })
                  }
                >
                  {VIEW_HISTORY}
                </Button>
              </Card.Text>
            </Card.Footer>
          </Card>
        </Col>
        <Col lg="6" md="12">
          <Card>
            <Card.Header className="">
              <Card.Title>
                <div className="d-flex gap-3 align-items-center">
                  {WITHDRAWALS}

                  <Button
                    className={`btn-primary light py-1-25 font-sm`}
                    variant="primary light"
                    onClick={() => setIsOpenWithdraw(true)}
                  >
                    <div className="d-flex align-items-center gap-2">
                      <i className="fa fa-plus fa-lg" />
                      <span className="fw-semibold">{CREATE_WITHDRAW}</span>
                    </div>
                  </Button>
                </div>
              </Card.Title>

              {!loading && (
                <Button
                  variant="btn-primary light py-1-25 font-sm"
                  onClick={() => {
                    if (!(withdrawBank && withdrawBank.accountNumber)) {
                      setOpenModel(true);
                    } else {
                      handleOpenWithdrawMessage();
                    }
                  }}
                >
                  {withdrawBank && withdrawBank.accountNumber
                    ? EDIT_BANK_ACCOUNT
                    : ADD_BANK_ACCOUNT}
                </Button>
              )}
            </Card.Header>
            <Card.Body>
              {loading ? (
                <div className="d-flex align-items-center justify-content-center w-100 h-100 pb-4">
                  <Spinner color="primary light" size={THIRTY_FIVE} />
                </div>
              ) : (
                <>
                  <Card.Text className="d-flex justify-content-between ">
                    <p className="text-body fw-bold">{ACCOUNT_TITLE}</p>
                    <p className="text-body">
                      {withdrawBank?.accountTitle && (
                        <>
                          {isCopied.withdraw.accountName ? (
                            <i class="las la-check-double fs-16 text-success mx-2" />
                          ) : (
                            <CopyToClipBoardIcon
                              className="cursor-pointer mx-2"
                              onClick={() => {
                                copyToClipboardHandler(ACCOUNT_NAME, WITHDRAW);
                              }}
                            />
                          )}
                        </>
                      )}

                      {startCase(withdrawBank?.accountTitle) || "- -"}
                    </p>
                  </Card.Text>
                  <Card.Text className="d-flex justify-content-between ">
                    <p className="text-body fw-bold">{_BSB}</p>
                    <p className="text-body">
                      {withdrawBank?.bsb && (
                        <>
                          {isCopied.withdraw.bsb ? (
                            <i class="las la-check-double fs-16 text-success mx-2" />
                          ) : (
                            <CopyToClipBoardIcon
                              className="cursor-pointer mx-2"
                              onClick={() => {
                                copyToClipboardHandler(BSB, WITHDRAW);
                              }}
                            />
                          )}
                        </>
                      )}

                      {withdrawBank?.bsb || "- -"}
                    </p>
                  </Card.Text>
                  <Card.Text className="d-flex justify-content-between ">
                    <p className="text-body fw-bold">{_ACCOUNT_NUMBER}</p>
                    <p className="text-body">
                      {withdrawBank?.accountNumber && (
                        <>
                          {isCopied.withdraw.accountNumber ? (
                            <i class="las la-check-double fs-16 text-success mx-2" />
                          ) : (
                            <CopyToClipBoardIcon
                              className="cursor-pointer mx-2"
                              onClick={() => {
                                copyToClipboardHandler(
                                  ACCOUNT_NUMBER,
                                  WITHDRAW
                                );
                              }}
                            />
                          )}
                        </>
                      )}

                      {withdrawBank?.accountNumber || "- -"}
                    </p>
                  </Card.Text>
                </>
              )}
            </Card.Body>
            <Card.Footer className="text-center">
              <Card.Text className="text-dark">
                <Button
                  className="w-50 mx-auto"
                  variant="btn-primary"
                  onClick={() =>
                    setSearchParams({ type: GenericConstant._WITHDRAW })
                  }
                >
                  {VIEW_HISTORY}
                </Button>
              </Card.Text>
            </Card.Footer>
          </Card>
        </Col>
      </Row>

      {openModel && (
        <AddBankAccount setOpenModel={setOpenModel} bankDetail={withdrawBank} />
      )}

      {withdrawModal && (
        <EditBankMessage handleCloseModal={handleOpenWithdrawMessage} />
      )}

      {isOpenWithdraw && (
        <CreateFiatWithdraw
          onCloseModal={handleWithdrawModelClose}
          handleRefresh={() => {}}
        />
      )}
    </>
  );
};

export default Accounts;
