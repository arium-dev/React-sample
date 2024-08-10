import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserWallet } from "../store/userWallet";

const UseUserWallet = () => {
  const dispatch = useDispatch();
  const { data: userWallet, loading } = useSelector(
    (state) => state.userWallet
  );

  const refresh = () => {
    dispatch(fetchUserWallet());
  };

  const apiCount = useRef(0);
  useEffect(() => {
    if (
      !(userWallet?.deposit || userWallet?.withdraw) &&
      !loading &&
      apiCount.current < 3
    ) {
      apiCount.current += 1;
      dispatch(fetchUserWallet());
    }
  }, [dispatch, loading, userWallet]);

  return { userWallet, loading, refresh };
};

export default UseUserWallet;
