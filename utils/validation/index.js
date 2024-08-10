import * as z from "zod";

import { ERRORS, GENERIC } from "./constants";
import {
  bankAccountTitleRegex,
  bsbRegex,
  passwordRegex,
  walletAddressRegex,
} from "./regex";
import {
  DOBValidation,
  acceptTermAndConditions,
  contactNumberValidation,
  currentPasswordValidation,
  emailValidation,
  firstNameValidation,
  lastNameValidation,
  nameValidation,
  verificationCodeValidation,
} from "./common";
import { SIDES, ONE_MILLION } from "../Constants";

//User

export const identificationSchema = z.object({
  firstName: firstNameValidation,
  lastName: lastNameValidation,
  email: emailValidation,
  dob: DOBValidation,
  contactNumber: contactNumberValidation,
});

export const recipientSchema = z.object({
  firstName: firstNameValidation,
  lastName: lastNameValidation,
  email: emailValidation,
  acceptTerms: acceptTermAndConditions,
});

export const changeEmailSchema = z.object({
  email: emailValidation,
});

export const verifyCurrentPasswordSchema = z.object({
  currentPassword: currentPasswordValidation,
});

export const changePasswordSchema = z
  .object({
    currentPassword: currentPasswordValidation,
    password: z.string().refine((value) => passwordRegex.test(value), {
      message: ERRORS.NEW_PASSWORD_INVALID,
    }),
    confirmPassword: z.string().refine((value) => passwordRegex.test(value), {
      message: ERRORS.NEW_PASSWORD_INVALID,
    }),
  })
  .superRefine((value, ctx) => {
    if (value.currentPassword === value.password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: ERRORS.DUPLICATE_NEW_PASSWORD,
        path: [GENERIC.PASSWORD],
      });
    }

    if (value.password !== value.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: ERRORS.PASSWORD_NOT_MATCHED,
        path: [GENERIC.CONFIRM_PASSWORD],
      });
    }
  });

export const twoFaSchema = z.object({
  verificationCode: verificationCodeValidation,
  id: z.string({
    required_error: ERRORS.ID_REQUIRED,
  }),
});

export const getTradeValidationSchema = (side) => {
  const coinSchema = {
    coinId: z
      .string({
        required_error: ERRORS.COIN_REQUIRED,
        invalid_type_error: ERRORS.COIN_REQUIRED,
      })
      .min(1, ERRORS.COIN_REQUIRED),
  };
  const currentBalanceSchema = {
    currentBalance: z.number({
      required_error: ERRORS.NUMERICAL_VALUE_REQUIRED,
    }),
  };
  const currentRateSchema = {
    currentRate: z
      .number({
        invalid_type_error: "",
      })
      .optional(),
  };
  const quantitySchema = {
    quantity: z
      .string({
        required_error: ERRORS.NUMERICAL_VALUE_REQUIRED,
        invalid_type_error: ERRORS.NUMERICAL_VALUE_REQUIRED,
      })
      .refine(
        (data) => {
          return parseFloat(data) >= 0.00000001;
        },
        {
          message: ERRORS.QUANTITY_MIN_REQUIRED,
        }
      ),
  };

  return side === SIDES.BUY
    ? z.object({
        ...currentRateSchema,
        ...currentBalanceSchema,
        ...coinSchema,
        amount: z
          .string({
            required_error: ERRORS.NUMERICAL_VALUE_REQUIRED,
            invalid_type_error: ERRORS.NUMERICAL_VALUE_REQUIRED,
          })
          .refine(
            (data) => {
              return parseFloat(data) >= 0.01;
            },
            {
              message: ERRORS.AMOUNT_MIN_REQUIRED,
            }
          ),
      })
    : side === SIDES.WITHDRAW
      ? z.object({
          ...coinSchema,
          walletAddress: z
            .string({
              required_error: ERRORS.WALLET_ADDRESS_REQUIRED,
              invalid_type_error: ERRORS.WALLET_ADDRESS_REQUIRED,
            })
            .min(1, ERRORS.WALLET_ADDRESS_REQUIRED)
            .regex(walletAddressRegex, ERRORS.WALLET_ADDRESS_INVALID),
          ...quantitySchema,
        })
      : side === SIDES.SELL
        ? z.object({
            ...currentRateSchema,
            ...coinSchema,
            ...quantitySchema,
          })
        : z.object({});
};

export const changeBankSchema = z.object({
  bsb: z.string().regex(bsbRegex, { message: ERRORS.BSB_REQUIRED }),
  accountNumber: z
    .string()
    .min(5, { message: ERRORS.BANK_ACCOUNT_NUMBER_REQUIRED })
    .max(20, {
      message: ERRORS.BANK_ACCOUNT_MAX_LENGTH,
    }),
  accountTitle: z
    .string()
    .min(1, { message: ERRORS.BANK_ACCOUNT_TITLE_REQUIRED })
    .max(100, {
      message: ERRORS.BANK_ACCOUNT_TITLE_MAX_LENGTH,
    })
    .regex(bankAccountTitleRegex, {
      message: ERRORS.BANK_ACCOUNT_TITLE_INVALID,
    }),
});

export const withdrawValidationSchema = z.object({
  accountNumber: z
    .string({
      required_error: ERRORS.BANK_ACCOUNT_REQUIRED,
      invalid_type_error: ERRORS.BANK_ACCOUNT_REQUIRED,
    })
    .min(1, ERRORS.BANK_ACCOUNT_REQUIRED),

  amount: z
    .number({
      required_error: ERRORS.AMOUNT_REQUIRED,
      invalid_type_error: ERRORS.NUMERICAL_VALUE_REQUIRED,
    })
    .positive(ERRORS.NON_ZERO_VALUE_REQUIRED)
    .min(10, ERRORS.WITHDRAW_MIN_AMOUNT_REQUIRED),
});

export const verify2FASchema = z.object({
  verificationCode: verificationCodeValidation,
});

export const forgotPasswordSchema = z.object({
  email: emailValidation,
});

export const loginSchema = z.object({
  email: emailValidation,
  password: z.string().min(1, ERRORS.PASSWORD_REQUIRED),
});

export const registerSchema = z.object({
  firstName: firstNameValidation,
  lastName: lastNameValidation,
  email: emailValidation,
  dob: DOBValidation,
});

export const setPasswordSchema = z
  .object({
    password: z.string().refine((value) => passwordRegex.test(value), {
      message: ERRORS.NEW_PASSWORD_INVALID,
    }),
    confirmPassword: z.string().refine((value) => passwordRegex.test(value), {
      message: ERRORS.NEW_PASSWORD_INVALID,
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: ERRORS.PASSWORD_NOT_MATCHED,
    path: ["confirmPassword"],
  });

export const verify2FAAuthSchema = z.object({
  verificationCode: verificationCodeValidation,
  loginKey: z.string({
    required_error: ERRORS.LOGIN_KEY_REQUIRED,
  }),
});

//Admin

export const createAdminSchema = z.object({
  firstName: firstNameValidation,
  lastName: lastNameValidation,
  email: emailValidation,
  role: z.string({
    required_error: ERRORS.ID_REQUIRED,
  }),
});

export const coinEditSchema = z.object({
  id: z.string().min(1, { message: ERRORS.COIN_SELECTION_REQUIRED }),
  uuid: z.string().min(1, { message: ERRORS.COIN_SELECTION_REQUIRED }),
  factor: z
    .string()
    .min(1, { message: ERRORS.FACTOR_INVALID })
    .max(3, { message: ERRORS.FACTOR_INVALID }),
});

export const rollingReserveSchema = z.object({
  coinId: z.string().min(1, { message: ERRORS.COIN_SELECTION_REQUIRED }),
  balance: z.number().gt(0, { message: ERRORS.BALANCE_NON_ZERO_REQUIRED }),
});

export const notesSchema = z.object({
  note: z.string().min(1, { message: ERRORS.NOTES_REQUIRED }).max(1000, {
    message: ERRORS.NOTES_INVALID_LENGTH,
  }),
});

export const videoCallSchema = z.object({
  link: z.string().min(1, { message: ERRORS.VIDEO_CALL_LINK_REQUIRED }),
});

export const addEmailSchema = z.object({
  email: z
    .string()
    .min(1, { message: ERRORS.ADD_EMAIL_REQUIRED })
    .max(1000, {
      message: ERRORS.NOTES_INVALID_LENGTH,
    })
    .email({ message: ERRORS.ADD_EMAIL_INVALID }),
});

export const createUserSchema = z.object({
  firstName: firstNameValidation,
  lastName: lastNameValidation,
  email: emailValidation,
  dob: DOBValidation,
});

export const adminCreateUserSchema = z.object({
  firstName: firstNameValidation,
  lastName: lastNameValidation,
  email: emailValidation,
  contactNumber: z.string().optional(),
  dob: DOBValidation,
  threshold: z.string().optional(),
});

export const apiKeySchema = z.object({
  _id: z.string().nullable(),
  name: nameValidation,
  emailNotification: z.boolean(),
  active: z.boolean(),
  key: z.boolean(),
});

export const identificationSchemaAdmin = z.object({
  firstName: firstNameValidation,
  lastName: lastNameValidation,
});

export const currencyExchangeSchema = z.object({
  amountInAud: z
    .number({
      required_error: ERRORS.AMOUNT_REQUIRED,
      invalid_type_error: ERRORS.NUMERICAL_VALUE_REQUIRED,
    })
    .positive(ERRORS.NON_ZERO_VALUE_REQUIRED)
    .max(ONE_MILLION, ERRORS.MAX_LIMIT_1000000),
  exchangeCurrencyId: z.string({
    required_error: ERRORS.CURRENCY_REQUIRED,
    invalid_type_error: ERRORS.CURRENCY_REQUIRED,
  }),
  currencyCode: z
    .string({
      invalid_type_error: "",
    })
    .optional(),
  feeAmount: z
    .number({
      invalid_type_error: "",
    })
    .optional(),
});
