import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCurrencies } from "../store/currencies";
import { getLocalStorageItem } from "../config/AuthSetting";
import { encryptedKeys } from "../utils";

const UseCurrency = () => {
  const dispatch = useDispatch();
  const role = getLocalStorageItem(encryptedKeys.userInfo)?.role;

  const { data: currencies, loading } = useSelector(
    (state) => state.currencies
  );

  const apiCount = useRef(0);
  useEffect(() => {
    if (
      role &&
      !(currencies && currencies.length > 0) &&
      !loading &&
      apiCount.current < 3
    ) {
      apiCount.current += 1;
      dispatch(fetchCurrencies(role));
    }
  }, [dispatch, loading, currencies, role]);

  return { currencies, loading };
};

export default UseCurrency;
