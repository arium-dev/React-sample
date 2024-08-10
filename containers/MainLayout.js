import React, {
  Suspense,
  useMemo,
  useContext,
  useState,
  useLayoutEffect,
} from "react";
import { Outlet, useLocation } from "react-router-dom";
import Nav from "../components/shared/Nav";
import ThemedSuspense from "../components/shared/ThemedSuspense";
import { PageViewRoutes } from "../utils/Constants";
import { ThemeContext } from "../context/ThemeContext";

const Layout = () => {
  return (
    <>
      <Nav />
      <div className="content-body d-flex flex-column">
        <Suspense fallback={<ThemedSuspense />}>
          <div className="container-fluid d-flex flex-column flex-grow-1 overflow-hidden">
            <Outlet />
          </div>
        </Suspense>
      </div>
    </>
  );
};

const MainLayout = () => {
  const location = useLocation();
  const { menuToggle } = useContext(ThemeContext);
  const memoizedLayout = useMemo(() => <Layout />, []);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useLayoutEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div
      id="main-wrapper"
      className={`${(PageViewRoutes.includes(location?.pathname) && "main-wrapper-cont") || ""} show ${!isMobile && !menuToggle ? "menu-toggle" : isMobile && menuToggle ? "menu-toggle" : ""}`}
    >
      {memoizedLayout}
    </div>
  );
};

export default MainLayout;
