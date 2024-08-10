import React, { useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { Card, Collapse } from "react-bootstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import _ from "lodash";
import { headerTransactionValues } from "./helper";
import { GENERIC_MESSAGES, ZERO } from "../../../utils/Constants";
import Spinner from "../../shared/Spinner";
import Badge from "../../shared/Badge";
import useOnScreen from "../../../hooks/UseOnScreen";
import {
  exchangeCurrencyPrice,
  getStatus,
  sourceCurrencyPrice,
} from "./helper";
import { THIRTY_FIVE } from "../Activities/constants";
import NoDataFound from "../../shared/NoDataFound";
import { formatDate } from "../../../utils";
import emailIcon from "../../../images/message.png";

const UserSubRow = ({ user, transactions, fetchTransactionsByRecipient }) => {
  const scrollRef = useRef(null);
  const containerRef = useRef(null);
  const userInfo = useSelector((state) => state.auth.userInfo);

  const onIntersection = useCallback(
    ([entry]) => {
      if (
        entry &&
        entry.isIntersecting &&
        transactions.total > transactions.list.length &&
        !transactions.loading
      ) {
        fetchTransactionsByRecipient();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [transactions.list, transactions.page, transactions.loading]
  );

  useOnScreen(scrollRef, containerRef, onIntersection);
  return (
    <>
      <tr className="mx-2 shadow-none">
        <td colSpan="8" className="remove-spacing">
          <Collapse in={user?.collapsed}>
            <div>
              <Card className="my-2 rounded-2 mx-1 table-card-scroll">
                <PerfectScrollbar
                  style={{ height: "100%" }}
                  id="DZ_W_TimeLine1"
                  className="widget-timeline dz-scroll style-1 h-100 ps ps--active-y"
                >
                  <Card.Body className="remove-spacing">
                    <table className="table dataTable shadow-hover display m-0">
                      {transactions?.list?.length === ZERO &&
                      !transactions.loading ? (
                        <div className="py-5">
                          <NoDataFound
                            message={GENERIC_MESSAGES.NO_DATA_TO_DISPLAY}
                          />
                        </div>
                      ) : transactions?.loading ? (
                        <div className="w-100 h-100 flex-grow-1 d-flex align-items-center justify-content-center py-5">
                          <Spinner
                            color=""
                            variant="primary"
                            size={THIRTY_FIVE}
                          />
                        </div>
                      ) : (
                        <>
                          <thead>
                            {headerTransactionValues.map((header, index) => {
                              return (
                                <th
                                  key={index}
                                  className="text-tableBody m-0 py-2 border-0 withdraw-table-header"
                                >
                                  <h6 className="my-0 p-0 fs-14 text-table-header">
                                    {header?.name}
                                  </h6>
                                </th>
                              );
                            })}
                          </thead>
                          <tbody className="" ref={containerRef}>
                            {transactions?.list?.length > ZERO &&
                              transactions.list.map((transaction) => {
                                return (
                                  <tr
                                    className="shadow-none"
                                    key={transaction?._id}
                                  >
                                    <td className="">
                                      <div className="d-flex align-items-center gap-2">
                                        <img
                                          src={
                                            transaction?.sourceCurrency?.logo
                                          }
                                          alt="Recipient"
                                          className="flag-view cursor-pointer"
                                        />
                                        <p className="m-0">
                                          {sourceCurrencyPrice(
                                            userInfo?.id,
                                            transaction
                                          )}
                                        </p>
                                        <p className="m-0">
                                          {transaction?.sourceCurrency?.code}
                                        </p>
                                      </div>
                                      <div className="d-flex align-items-center gap-2">
                                        <img
                                          src={
                                            transaction?.exchangeCurrency?.logo
                                          }
                                          alt="Recipient"
                                          className="flag-view cursor-pointer"
                                        />
                                        <p className="m-0">
                                          {exchangeCurrencyPrice(
                                            userInfo?.id,
                                            transaction
                                          )}
                                        </p>
                                        <p className="m-0">
                                          {transaction?.exchangeCurrency?.code}
                                        </p>
                                      </div>
                                    </td>

                                    <td>
                                      <p className="m-0">
                                        {formatDate(transaction?.createdAt)}
                                      </p>
                                    </td>

                                    <td>
                                      <Badge
                                        status={getStatus(transaction?.status)}
                                      >
                                        {_.capitalize(
                                          getStatus(transaction?.status)
                                        )}
                                      </Badge>
                                    </td>
                                  </tr>
                                );
                              })}
                            <tr
                              id="view-row"
                              ref={scrollRef}
                              className="w-100"
                              style={{ height: "10px" }}
                            />
                          </tbody>
                        </>
                      )}
                    </table>
                  </Card.Body>
                </PerfectScrollbar>
              </Card>
            </div>
          </Collapse>
        </td>
      </tr>
    </>
  );
};

export default UserSubRow;
