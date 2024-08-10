import * as z from "zod";
import { ERRORS, LENGTH } from "./constants";
import { alphanumericRegex, nameRegex, phoneRegex } from "./regex";

export const verificationCodeValidation = z
  .string({ required_error: ERRORS.VERIFICATION_CODE_REQUIRED })
  .min(6, { message: ERRORS.VERIFICATION_CODE_INVALID })
  .max(6, { message: ERRORS.VERIFICATION_CODE_INVALID });

export const emailValidation = z
  .string()
  .min(1, { message: ERRORS.EMAIL_REQUIRED })
  .email({ message: ERRORS.EMAIL_INVALID });

export const currentPasswordValidation = z
  .string()
  .min(1, { message: ERRORS.CURRENT_PASSWORD_REQUIRED });

export const firstNameValidation = z
  .string()
  .min(1, { message: ERRORS.FIRST_NAME_REQUIRED })
  .regex(nameRegex, {
    message: ERRORS.FIRST_NAME_INVALID,
  })
  .max(30, { message: LENGTH.MAX_30 });

export const lastNameValidation = z
  .string()
  .min(1, { message: ERRORS.LAST_NAME_REQUIRED })
  .regex(nameRegex, {
    message: ERRORS.LAST_NAME_INVALID,
  })
  .max(30, { message: LENGTH.MAX_30 });

export const DOBValidation = z
  .string()
  .min(1, { message: ERRORS.DOB_REQUIRED })
  .refine(
    (date) => {
      const dob = new Date(date);
      const minDate = new Date();
      minDate.setFullYear(minDate.getFullYear() - 18);

      return dob < minDate;
    },
    {
      message: ERRORS.DOB_MIN_INVALID,
    }
  )
  .refine(
    (date) => {
      const dob = new Date(date);
      return dob.getFullYear() > 1900;
    },
    {
      message: ERRORS.DOB_MAX_INVALID,
    }
  );

export const acceptTermAndConditions = z.boolean().optional();

export const contactNumberValidation = z
  .string()
  .optional()
  .refine((value) => !value || (value.length > 0 && phoneRegex.test(value)), {
    message: ERRORS.CONTACT_NUMBER_INVALID,
  });

export const nameValidation = z.string();
z.string()
  .trim()
  .min(1, { message: ERRORS.NAME_REQUIRED })
  .regex(alphanumericRegex, {
    message: ERRORS.NAME_INVALID,
  })
  .max(30, { message: LENGTH.MAX_30 });
