import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import ThemedSuspense from "../components/shared/ThemedSuspense";

const AuthLayout = () => {
  return (
    <div className="vw-100 vh-100">
      <Suspense fallback={<ThemedSuspense />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default AuthLayout;
