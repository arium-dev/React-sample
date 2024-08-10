import { error, success } from "../../../shared/Alert";
import { ExecuteHttpRequest } from "../../../../ExecuteHttpRequest";
import { methods, UserUrls } from "../../../../utils";
import { HTTP_STATUS_CODE } from "../../../../utils/Constants";

export const handleWithdrawBankAccount = async (
  data,
  onCloseModal,
  userWallet,
  handleUpdateUserWallets
) => {
  try {
    let resp = {};
    if (data && data.id) {
      resp = await ExecuteHttpRequest(
        methods.PUT,
        UserUrls.updateWithDrawBankUrl(data.id),
        data
      );
    } else {
      resp = await ExecuteHttpRequest(
        methods.POST,
        UserUrls.createWithdrawalWalletUrl,
        data
      );
    }

    if (
      resp.status === HTTP_STATUS_CODE.OK &&
      resp.data &&
      resp.data.type &&
      resp.data.data
    ) {
      success(resp.message);
      await handleUpdateUserWallets({
        ...userWallet,
        [resp.data.type]: { ...resp.data.data, id: resp?.data?.id },
      });
      onCloseModal();
    } else {
      error(resp.message);
    }
  } catch (err) {
    error(err.message);
  }
};
