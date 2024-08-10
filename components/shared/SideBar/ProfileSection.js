import React, { useLayoutEffect } from "react";
import { Logout, encryptedKeys } from "../../../utils";
import { useSelector, useDispatch } from "react-redux";
import { getKycIcon } from "./helper";
import { fetchUserProfile } from "../../../store/userProfile";
import { LogoutIcon } from "../../../icons";
import { GenericConstant, ROLES } from "../../../utils/Constants";
import { getLocalStorageItem } from "../../../config/AuthSetting";

const ProfileSection = () => {
  const dispatch = useDispatch();
  const { data: userProfile } = useSelector((state) => state.userProfile);
  const role = getLocalStorageItem(encryptedKeys.userInfo)?.role || ROLES.USER;

  useLayoutEffect(() => {
    if (!userProfile && role === ROLES.USER) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, userProfile, role]);

  return (
    <>
      <ul className="metismenu footer-menu">
        <li className="">
          {(userProfile && getKycIcon(userProfile?.level)) || ""}
        </li>
        <li className="text-center">
          <div
            className="my-0 c-pointer d-flex align-items-center justify-content-start"
            onClick={Logout}
          >
            <span className="ps-1">
              <LogoutIcon className="logout-icon" />
            </span>
            <span className="ms-2 fs-6 nav-text">{GenericConstant.LOGOUT}</span>
          </div>
        </li>
      </ul>
    </>
  );
};

export default ProfileSection;
