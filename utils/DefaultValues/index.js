import value from "./common";

export const forgotPasswordDefaultValues = {
  email: value.email,
};

export const loginDefaultValues = {
  email: value.email,
  password: value.password,
};

export const twoFactorWithIdDefaultValues = {
  verificationCode: value.verificationCode,
  id: "",
};

export const registerDefaultValues = {
  firstName: value.firstName,
  lastName: value.lastName,
  email: value.email,
  dob: value.dob,
};

export const setPasswordDefaultValues = {
  password: value.password,
  confirmPassword: value.confirmPassword,
};

export const twoFactorWithKeyDefaultValues = {
  verificationCode: value.verificationCode,
  loginKey: "",
};

export const changeEmailDefaultValues = {
  email: value.email,
};

export const changePasswordDefaultValues = {
  currentPassword: value.currentPassword,
  password: value.password,
  confirmPassword: value.confirmPassword,
};

export const twoFactorDefaultValues = {
  verificationCode: value.verificationCode,
};

export const accountSettingDefaultValues = {
  firstName: value.firstName,
  lastName: value.lastName,
  email: value.email,
  dob: value.dob,
  contactNumber: "",
};

export const verifyCurrentPasswordDefaultValues = {
  currentPassword: value.currentPassword,
};

export const withdrawDefaultValues = {
  walletId: "",
  amount: "",
  accountNumber: "",
};

export const accountSettingAdminDefaultValues = {
  firstName: value.firstName,
  lastName: value.lastName,
};

export const apiKeyDefaultValues = {
  _id: null,
  name: "",
  emailNotification: false,
  active: false,
  key: false,
};

export const rollingReserveDefaultValues = {
  coin: [],
  coinId: "",
  balance: 0,
};

export const notesDefaultValues = {
  note: "",
};

export const addEmailDefaultValues = {
  email: value.email,
};

export const videoCallDefaultValues = {
  link: "",
};

export const createUserDefaultValues = {
  firstName: value.firstName,
  lastName: value.lastName,
  email: value.email,
  dob: value.dob,
};
