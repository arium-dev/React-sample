import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logoColor from "../../../images/logo/simpleLogo.png";
import logoColorText from "../../../images/logo/logoText.png";
import logo from "../../../images/logo/simpleLogoWhite.png";
import logoText from "../../../images/logo/logoTextWhite.png";
import { ThemeContext } from "../../../context/ThemeContext";
import { HambharIcon } from "../../../icons";

export function NavMenuToggle() {
  setTimeout(() => {
    let mainwrapper = document.querySelector("#main-wrapper");
    if (mainwrapper.classList.contains("menu-toggle")) {
      mainwrapper.classList.remove("menu-toggle");
    } else {
      mainwrapper.classList.add("menu-toggle");
    }
  }, 200);
}

const NavHeader = () => {
  const { menuToggle: toggle, handleMenuToggle } = useContext(ThemeContext);
  return (
    <div className="nav-header">
      <Link to="/" className="brand-logo">
        <img src={logo} className="logo-abbr" alt="" />
        <img src={logoText} className="brand-title" alt="" />
        <img src={logoColor} className="logo-color" alt="" />
        <img src={logoColorText} className="brand-title color-title" alt="" />
      </Link>

      <div className="nav-control" onClick={() => handleMenuToggle()}>
        <div className={`hamburger ${!toggle ? "is-active" : ""}`}>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
          {<HambharIcon />}
        </div>
      </div>
    </div>
  );
};

export default NavHeader;
