import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/style.css";
import { routes, adminRoutes, getAuthRoutes } from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { reCaptchaKey } from "./config";
import { getLocalStorageItem } from "./config/AuthSetting";
import MainLayout from "./containers/MainLayout";
import AuthLayout from "./containers/AuthLayout";
import Error404 from "./pages/Error404";
import ChangeEmailVerify from "./pages/user/changeEmail";
import ScheduleMeeting from "./pages/auth/ScheduleMeeting";
import {
  ADMIN_ROLES,
  GenericConstant,
  Routes as RoutePaths,
  SUPER_ADMIN_ROLES,
} from "./utils/Constants";
import { AdminRoutes } from "./utils/Constants";
import ThemedSuspense from "./components/shared/ThemedSuspense";
import { encryptedKeys } from "./utils";

function App() {
  const token = getLocalStorageItem(encryptedKeys.token);
  const role = getLocalStorageItem(encryptedKeys.userInfo)?.role;

  let routeElements;

  if (token && role === GenericConstant._USER) {
    routeElements = (
      <>
        <Route
          key={RoutePaths.CHANGE_EMAIL_VERIFY}
          path={RoutePaths.CHANGE_EMAIL_VERIFY}
          element={<ChangeEmailVerify />}
        />
        <Route
          key={RoutePaths.SCHEDULE_MEETING}
          path={RoutePaths.SCHEDULE_MEETING}
          element={<ScheduleMeeting />}
        />
        <Route path="/" element={<MainLayout />}>
          {routes.map((route, i) => (
            <Route key={i} path={route.path} element={route.element} />
          ))}
          <Route
            key={"index"}
            path="/"
            element={<Navigate to={RoutePaths.DASHBOARD} />}
          />
        </Route>

        {getAuthRoutes().map((route, i) => (
          <Route
            key={i}
            path={route.path}
            element={<Navigate to={RoutePaths.DASHBOARD} />}
          />
        ))}
        <Route key={"404"} path="*" element={<Error404 />} />
      </>
    );
  } else if (token && SUPER_ADMIN_ROLES?.includes(role?.toLowerCase())) {
    routeElements = (
      <>
        <Route path="/" element={<MainLayout />}>
          {adminRoutes
            .filter(
              (route) =>
                role?.toLowerCase() === GenericConstant._SUPER_ADMIN ||
                route.roles.includes(role?.toLowerCase())
            )
            .map((route, i) => (
              <Route key={i} path={route.path} element={route.element} />
            ))}

          <Route
            key={"index"}
            path="/"
            element={<Navigate to={AdminRoutes.DASHBOARD} />}
          />
          {getAuthRoutes().map((route, i) => (
            <Route
              key={i}
              path={route.path}
              element={<Navigate to={AdminRoutes.DASHBOARD} />}
            />
          ))}
        </Route>

        <Route key={"404"} path="*" element={<Error404 />} />
      </>
    );
  } else {
    routeElements = (
      <>
        <Route
          key={RoutePaths.CHANGE_EMAIL_VERIFY}
          path={RoutePaths.CHANGE_EMAIL_VERIFY}
          element={<ChangeEmailVerify />}
        />
        <Route path="/" element={<AuthLayout />}>
          {getAuthRoutes().map((route, i) => (
            <Route key={i} path={route.path} element={route.element} />
          ))}
          <Route
            key={"index"}
            path="/"
            element={<Navigate to={RoutePaths.LOGIN} />}
          />
          <Route
            key={"*"}
            path="/*"
            element={<Navigate to={RoutePaths.LOGIN} />}
          />
        </Route>
      </>
    );
  }

  const router = createBrowserRouter(createRoutesFromElements(routeElements));

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="light"
        pauseOnHover
      />
      <GoogleReCaptchaProvider reCaptchaKey={reCaptchaKey}>
        <RouterProvider router={router} fallbackElement={<ThemedSuspense />} />
      </GoogleReCaptchaProvider>
    </>
  );
}

export default App;
