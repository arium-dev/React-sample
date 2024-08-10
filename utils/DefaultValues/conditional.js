import { GenericConstant, SIDES } from "../Constants";

export const getTradeDefaultValues = (side) => {
  const values = { coinId: null, currentBalance: 0 };
  return side === SIDES.BUY
    ? { ...values, amount: 0 }
    : { ...values, quantity: 0, walletAddress: "" };
};

export const initialChangeBankValues = {
  id: "",
  bsb: "",
  accountNumber: "",
  accountTitle: "",
};

export const handleDefaultValues = (bankAccountDetails = {}) => {
  if (bankAccountDetails) {
    return {
      id: bankAccountDetails.id || "",
      bsb: bankAccountDetails.bsb || "",
      accountNumber: bankAccountDetails.accountNumber || "",
      accountTitle: bankAccountDetails.accountTitle || "",
    };
  } else {
    return initialChangeBankValues;
  }
};

export const recipientDefaultValues = () => {
  return {
    firstName: "",
    lastName: "",
    email: "",
    acceptTerm: false,
  };
};

export const createAdminDefaultValues = (edit) => {
  return {
    firstName: edit?.firstName || "",
    lastName: edit?.lastName || "",
    email: edit?.email || "",
    role: edit?.role || GenericConstant.ADMIN,
  };
};

export const coinSchemaDefaultValues = (edit, list) => {
  const obj = {
    factor: edit?.variantFactor || 0.0,
    coin: [],
    coinId: "",
  };
  if (edit?.id) {
    let exists = list.find((coin) => coin.id === edit.id);
    if (exists.id) {
      obj.coin = [exists];
      obj.uuid = exists.uuid;
      obj.id = exists.id;
    }
  }
  return obj;
};

export const editUserDefaultValues = (edit) => {
  return {
    firstName: edit?.firstName || "",
    lastName: edit?.lastName || "",
    email: edit?.email || "",
    contactNumber: edit?.contactNumber || "",
    dob: edit?.dob || "",
    threshold: edit?.threshold || 0,
  };
};

export const getCurrencyExchangeInitialValues = (
  currency = null,
  modal = null,
  amountInAud = null,
  destinationCurrency = null,
  currencyRate = null,
  currencyCode = null,
  transactionFee = null,
  exchangeCurrencyId = null
) => {
  console.log("exchangeCurrencyId", exchangeCurrencyId);

  let feeAmount, amountReceived;

  if (amountInAud && transactionFee?.value) {
    feeAmount = (amountInAud * parseFloat(transactionFee?.value || 0)) / 100;

    amountReceived =
      parseFloat(parseFloat(amountInAud) - feeAmount) *
      parseFloat(currencyRate);
  }

  const values = {
    exchangeCurrencyId: exchangeCurrencyId || currency?.id,
    destinationCurrency: destinationCurrency || currency, //
    amountInAud: amountInAud || modal?.formData?.amount || 0, //
    currencyRate: currencyRate || currency?.conversionRate || 0,
    currencyCode: currencyCode || currency?.code || "",
    feeAmount: feeAmount || 0,
  };

  if (amountReceived) {
    values.amountReceived = amountReceived;
  }

  return values;
};
