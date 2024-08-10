import React from "react";
import {
  capitalizeText,
  formatDate,
  isAuthorizedAction,
} from "../../../../utils";
import {
  GenericConstant,
  PERMISSIONS,
  PLACEHOLDERS,
} from "../../../../utils/Constants";
import { getRescheduleLink, getUuid } from "../helper";
import SendEmailDropdown from "./UpdateInformation/SendEmailDropdown";
import {
  addEmailOpen,
  addNotesOpen,
  addVideoLinkOpen,
} from "./UpdateInformation/helper";
import Badge from "../../../shared/Badge";
import {
  ADD_EMAIL,
  ADD_NOTES,
  ADD_VIDEO_CALL_LINK,
  APPROVED,
  CLICK_TO_RESCHEDULE,
  UPDATE_NOTES,
  VISIT_LINK,
  pendingDepositEmailValues,
} from "../constants";
import {
  getEddClassName,
  getEddStatus,
  getName,
  sendEmailHandler,
  pendingDepositDisabled,
} from "./helper";
import { BOOKED, CONFIRMED } from "./UpdateInformation/constants";

const Row = ({ item, transaction, setTransaction, setData, permissions }) => {
  return (
    <tr>
      <td>{formatDate(item.createdAt)}</td>
      <td>{getName(item)}</td>
      <td>
        <span className={getEddClassName(item?.status)}>
          {capitalizeText(getEddStatus(item?.status))}
        </span>
      </td>

      <td>
        <SendEmailDropdown
          size={GenericConstant._XS}
          placeholder={PLACEHOLDERS.SEND_EMAIL}
          list={pendingDepositEmailValues}
          onSelect={async (e, value) => {
            if (
              value.target.innerText &&
              isAuthorizedAction(
                PERMISSIONS.RESEND_EDD_EMAIL_PENDING_DEPOSIT,
                permissions
              )
            ) {
              await sendEmailHandler(
                value.target.innerText,
                item,
                setData,
                setTransaction
              );
            }
          }}
          loading={
            transaction?.emailLoading && item?._id === transaction?.data?._id
          }
          emailStatus={item?.emailStatus}
          disabled={
            !isAuthorizedAction(
              PERMISSIONS.RESEND_EDD_EMAIL_PENDING_DEPOSIT,
              permissions
            ) ||
            item?.status === BOOKED ||
            item?.status === CONFIRMED ||
            transaction?.statusLoading
          }
        />
      </td>

      <td>
        {item?.note ? (
          <span
            onClick={() => {
              if (
                isAuthorizedAction(
                  PERMISSIONS.EDIT_NOTES_PENDING_DEPOSIT,
                  permissions
                ) &&
                !pendingDepositDisabled(transaction)
              ) {
                addNotesOpen(setTransaction, item, true);
              }
            }}
            disabled={
              !isAuthorizedAction(
                PERMISSIONS.EDIT_NOTES_PENDING_DEPOSIT,
                permissions
              )
            }
          >
            <Badge
              className={`badge-primary light badge-xm cursor-pointer ${
                !isAuthorizedAction(
                  PERMISSIONS.EDIT_NOTES_PENDING_DEPOSIT,
                  permissions
                ) && "opacity-75 cursor-not-allowed"
              }`}
            >
              {UPDATE_NOTES}
            </Badge>
          </span>
        ) : (
          <span
            onClick={() => {
              if (
                isAuthorizedAction(
                  PERMISSIONS.ADD_NOTES_PENDING_DEPOSIT,
                  permissions
                ) &&
                !pendingDepositDisabled(transaction)
              ) {
                addNotesOpen(setTransaction, item);
              }
            }}
            disabled={
              !isAuthorizedAction(
                PERMISSIONS.ADD_NOTES_PENDING_DEPOSIT,
                permissions
              )
            }
          >
            <Badge
              className={`badge-primary light badge-xm cursor-pointer ${
                !isAuthorizedAction(
                  PERMISSIONS.ADD_NOTES_PENDING_DEPOSIT,
                  permissions
                ) && "opacity-75 cursor-not-allowed"
              }`}
            >
              {ADD_NOTES}
            </Badge>
          </span>
        )}
      </td>

      <td>
        {item?.videoLink ? (
          <div className="d-flex gap-2 align-items-center">
            <a
              href={item?.videoLink}
              target="_blank"
              className="text-sm text-primary"
              rel="noreferrer"
            >
              {VISIT_LINK}
            </a>
            {isAuthorizedAction(
              PERMISSIONS.EDIT_EDD_LINK_PENDING_DEPOSIT,
              permissions
            ) && (
              <span
                className="btn btn-primary shadow btn-xs sharp me-3"
                onClick={() => {
                  if (!pendingDepositDisabled(transaction)) {
                    addVideoLinkOpen(setTransaction, item, true);
                  }
                }}
              >
                <i className="fas fa-pencil-alt"></i>
              </span>
            )}
          </div>
        ) : (
          <span
            onClick={() => {
              if (
                isAuthorizedAction(
                  PERMISSIONS.ADD_EDD_LINK_PENDING_DEPOSIT,
                  permissions
                ) &&
                !pendingDepositDisabled(transaction)
              ) {
                addVideoLinkOpen(setTransaction, item);
              }
            }}
            disabled={
              !isAuthorizedAction(
                PERMISSIONS.ADD_EDD_LINK_PENDING_DEPOSIT,
                permissions
              )
            }
          >
            <Badge
              className={`badge-primary light badge-xm cursor-pointer ${!isAuthorizedAction(PERMISSIONS.ADD_EDD_LINK_PENDING_DEPOSIT, permissions) && "opacity-75 cursor-not-allowed"}`}
              status={APPROVED}
            >
              {ADD_VIDEO_CALL_LINK}
            </Badge>
          </span>
        )}
      </td>

      <td>
        <p className="m-0">
          {isAuthorizedAction(
            PERMISSIONS.RESCHEDULE_EDD_PENDING_DEPOSIT,
            permissions
          ) && getUuid(item) ? (
            <a
              href={getRescheduleLink(item)}
              target="_blank"
              rel="noreferrer"
              className="text-decoration-none cursor-pointer"
            >
              <u>{CLICK_TO_RESCHEDULE}</u>
            </a>
          ) : (
            "-"
          )}
        </p>
      </td>

      {/* <td>
        {item?.userId?.contactEmail ? (
          <span className="d-flex gap-2 align-items-center">
            <span>{item?.userId?.contactEmail}</span>
            {isAuthorizedAction(
              PERMISSIONS.EDIT_CONTACT_EMAIL_PENDING_DEPOSIT,
              permissions
            ) && (
              <div
                className="btn btn-primary shadow btn-xs sharp me-3"
                onClick={() => {
                  if (!pendingDepositDisabled(pendingDeposit)) {
                    addEmailOpen(setTransaction, item, true);
                  }
                }}
              >
                <i className="fas fa-pencil-alt"></i>
              </div>
            )}
          </span>
        ) : (
          <span
            onClick={() => {
              if (
                isAuthorizedAction(
                  PERMISSIONS.ADD_CONTACT_EMAIL_PENDING_DEPOSIT,
                  permissions
                ) &&
                !pendingDepositDisabled(pendingDeposit)
              ) {
                addEmailOpen(setTransaction, item);
              }
            }}
            disabled={
              !isAuthorizedAction(
                PERMISSIONS.ADD_CONTACT_EMAIL_PENDING_DEPOSIT,
                permissions
              )
            }
          >
            <Badge
              className={`badge-primary light badge-xm cursor-pointer ${!isAuthorizedAction(PERMISSIONS.ADD_CONTACT_EMAIL_PENDING_DEPOSIT, permissions) && "opacity-75 cursor-not-allowed"}`}
              status={APPROVED}
            >
              {ADD_EMAIL}
            </Badge>
          </span>
        )}
      </td> */}
    </tr>
  );
};

export default Row;
