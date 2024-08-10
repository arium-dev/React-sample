import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTransactionFee } from "../store/transactionFee";

const UseTransactionFee = () => {
  const dispatch = useDispatch();
  const { transactionFee, loading } = useSelector(
    (state) => state.transactionFee
  );

  const apiCount = useRef(0);
  useEffect(() => {
    if (!transactionFee && !loading && apiCount.current < 3) {
      apiCount.current += 1;
      dispatch(fetchTransactionFee());
    }
  }, [dispatch, loading, transactionFee]);

  return { transactionFee, loading };
};

export default UseTransactionFee;
