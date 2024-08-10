import { error, success } from "../../shared/Alert";
import { ExecuteHttpRequest } from "../../../ExecuteHttpRequest";
import { UserUrls, methods } from "../../../utils";
import { HTTP_STATUS_CODE } from "../../../utils/Constants";

export const handleDepositWallet = async (
  setSpin,
  userBankDetail,
  handleUpdateBankDetail
) => {
  setSpin(true);

  const resp = await ExecuteHttpRequest(
    methods.POST,
    UserUrls.createDepositWalletUrl
  );
  if (
    resp.status === HTTP_STATUS_CODE.OK &&
    resp.data &&
    resp.data.type &&
    resp.data.data
  ) {
    const { type, data } = resp.data;
    success(resp.message);
    const details = {
      ...userBankDetail,
      [type]: data,
    };
    handleUpdateBankDetail(details);
    setSpin(false);
  } else {
    error(resp.message);
    setSpin(false);
  }
};

export const isCopiedInitialValues = {
  deposit: {
    accountName: false,
    bsb: false,
    accountNumber: false,
  },
  withdraw: {
    accountName: false,
    bsb: false,
    accountNumber: false,
  },
};

export const historyInitialValues = { isOpen: false, type: "" };
