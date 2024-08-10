import { React, useState, useEffect } from "react";
import Balance from "./Balance";
import { ExchangeRate } from "./ExchangeRate";
import RecentTransactions from "./RecentTransactions";
import KycModal from "../../shared/Modal/KYCModal";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { KYC } from "./constants";

const Dashboard = () => {
  const [kycAlert, setKycAlert] = useState(false);
  const { data: userProfile } = useSelector((state) => state.userProfile);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const kyc = searchParams.get(KYC);

  useEffect(() => {
    if (userProfile?.level && userProfile?.level !== 3 && kyc)
      setKycAlert(true);
    //eslint-disable-next-line
  }, [userProfile]);

  return (
    <>
      <div className="bg-white h-100 px-5 pt-4 pb-2 rounded-2 mb-4">
        <Balance />
        <ExchangeRate />
        <RecentTransactions />
      </div>
      <KycModal
        isOpen={kycAlert}
        onClose={() => {
          setKycAlert(false);
        }}
      />
    </>
  );
};

export default Dashboard;
