import { useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBalance } from "../store/balance";

const UseUserBalance = () => {
  const dispatch = useDispatch();
  const { balance, loading } = useSelector((state) => state.balance);
  const handleRefreshBalance = useCallback(() => {
    dispatch(fetchBalance());
  }, [dispatch]);

  const apiCount = useRef(0);
  useEffect(() => {
    if (!Boolean(balance) && !loading && apiCount.current < 3) {
      apiCount.current += 1;
      handleRefreshBalance();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, balance]);

  return { balance, loading, handleRefreshBalance };
};

export default UseUserBalance;
