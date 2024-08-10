import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Identification from "./Identification/Form";
import Setting from "./Setting/Form";
import { fetchAdminProfile } from "./helper";
import ThemedSuspense from "../../shared/ThemedSuspense";

const AccountSetting = () => {
  const [userProfile, setUserProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const permissions = useSelector((state) => state.auth.permissions);

  useEffect(() => {
    fetchAdminProfile(setUserProfile, setLoading);
  }, []);

  return (
    <>
      {!loading ? (
        <>
          <Identification
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            permissions={permissions}
          />
          <Setting setUserProfile={setUserProfile} permissions={permissions} />
        </>
      ) : (
        <ThemedSuspense />
      )}
    </>
  );
};

export default AccountSetting;
