import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { routes } from "../routes";
import ThemedSuspense from "../components/shared/ThemedSuspense";

// const Page404 = lazy(() => import("../pages/404"));

const UserLayout = () => {
  return (
    <Suspense fallback={<ThemedSuspense />}>
      <Routes>
        {routes.map((route, i) => {
          return route.component ? (
            <Route
              key={i}
              exact={true}
              path={`${route.path}`}
              render={(props) => <route.component {...props} />}
            />
          ) : null;
        })}
        {/* <Redirect exact from="/" to={Routes.LOGIN} /> */}
        {/* <Redirect to={Routes.LOGIN} /> */}
        {/* Add Page404 Route Here */}
        {/* <Route component={Page404} /> */}
      </Routes>
    </Suspense>
  );
};

export default UserLayout;
