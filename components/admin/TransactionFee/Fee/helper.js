import { z } from "zod";
import { ExecuteHttpRequest } from "../../../../ExecuteHttpRequest";
import { parseUrl } from "../../../../ExecuteHttpRequest/helper";
import { AdminUrls, methods } from "../../../../utils";
import { HTTP_STATUS_CODE } from "../../../../utils/Constants";
import { error, success } from "../../../shared/Alert";
import { ERRORS } from "../../../../utils/validation/constants";

export const initialTotalTransactionFee = {
  loading: false,
  data: null,
};

const formatData = (resp) => {
  return resp?.data?.[0]?.totalFee || 0;
};

export const fetchAllTransactionFee = async (setData) => {
  try {
    setData((prev) => ({ ...prev, loading: true }));

    let url = parseUrl(AdminUrls.fetchAllTransactionFee);
    const resp = await ExecuteHttpRequest(methods.GET, url);

    if (resp.status === HTTP_STATUS_CODE.OK) {
      setData((prev) => ({
        ...prev,
        loading: false,
        data: formatData(resp),
      }));
    } else {
      setData((prev) => ({
        ...prev,
        loading: false,
        data: [],
      }));
    }
  } catch (err) {
    setData((prev) => ({ ...prev, loading: false, data: [] }));
  }
};

export const setFeeHandler = async (formData) => {
  const resp = await ExecuteHttpRequest(
    methods.PUT,
    AdminUrls.updateFee,
    formData
  );

  if (resp.status === HTTP_STATUS_CODE.OK) {
    success(resp.message);
  } else {
    error(resp.message);
  }
};

export const feeDefaultValues = {
  fee: "",
};

export const feeSchema = z.object({
  fee: z.string().superRefine((value, ctx) => {
    const number = parseFloat(value);

    if (isNaN(number) || number < 0 || number > 100) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: ERRORS.TRANSACTION_FEE_INVALID_RANGE,
      });
    }

    const decimalPart = value.split(".")[1];
    if (decimalPart && decimalPart.length > 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: ERRORS.TRANSACTION_FEE_INVALID_DIGITS,
      });
    }
  }),
});
