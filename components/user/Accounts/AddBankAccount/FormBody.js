import React from "react";
import Input from "../../../shared/Input/Input";
import {
  BUTTON_TYPE,
  LABELS,
  PLACEHOLDERS,
  TYPE,
} from "../../../../utils/Constants";
import Button from "../../../shared/Button";
import {
  BANK_ACCOUNT_NUMBER,
  BANK_ACCOUNT_TITLE,
  BSB,
  SUBMIT,
  SEVEN,
  NINE,
} from "./constants";
import { BSBRegex } from "../../../../utils";

const FormBody = ({ errors, isSubmitting, watch, trigger, setValue }) => {
  return (
    <>
      <Input
        type={TYPE.TEXT}
        name={BANK_ACCOUNT_TITLE}
        label={LABELS.BANK_ACCOUNT_TITLE}
        placeholder={PLACEHOLDERS.BANK_ACCOUNT_TITLE}
        value={watch(BANK_ACCOUNT_TITLE)}
        error={errors?.[BANK_ACCOUNT_TITLE]?.message}
        onBlur={() => trigger(BANK_ACCOUNT_TITLE)}
        onChange={(e) => {
          setValue(BANK_ACCOUNT_TITLE, e.target.value, { shouldDirty: true });
          trigger(BANK_ACCOUNT_TITLE);
        }}
      />
      <Input
        type={TYPE.TEXT}
        name={BSB}
        label={LABELS.BSB}
        placeholder={PLACEHOLDERS.BSB}
        value={watch(BSB)}
        error={errors?.[BSB]?.message}
        onBlur={() => trigger(BSB)}
        onChange={(e) => {
          const value = BSBRegex(e.target.value);
          if (value.length > SEVEN) return;
          setValue(BSB, value, { shouldDirty: true });
          trigger(BSB);
        }}
      />
      <Input
        type={TYPE.TEXT}
        name={BANK_ACCOUNT_NUMBER}
        label={LABELS.BANK_ACCOUNT_NUMBER}
        placeholder={PLACEHOLDERS.BANK_ACCOUNT_NUMBER}
        value={watch(BANK_ACCOUNT_NUMBER)}
        error={errors?.[BANK_ACCOUNT_NUMBER]?.message}
        onBlur={() => trigger(BANK_ACCOUNT_NUMBER)}
        onChange={(e) => {
          if (e.target.value.length > NINE) return;
          setValue(BANK_ACCOUNT_NUMBER, e.target.value, { shouldDirty: true });
          trigger(BANK_ACCOUNT_NUMBER);
        }}
      />

      <div className="d-flex justify-content-end border-top mt-3">
        <Button
          type={BUTTON_TYPE.SUBMIT}
          className="mt-3"
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          {SUBMIT}
        </Button>
      </div>
    </>
  );
};

export default FormBody;
