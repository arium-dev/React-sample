import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../images/nebula-fx-logo.png";

const Header = ({ children, heading, subHeading }) => {
  return (
    <>
      <div className="bg-img-fix overflow-hidden bg-cover header-page-layout">
        <div className="row gx-0">
          <div className="col-xl-5 col-lg-5 col-md-6 col-sm-12 vh-100 bg-light-primary">
            <div className="login-form style-2 mx-5 py-5 h-100 d-flex flex-column align-items-center justify-content-center overflow-hidden">
              <div className="px-lg-4 d-flex flex-column justify-content-center overflow-hidden">
                <div className="logo-header w-75 d-flex justify-content-center align-items-center m-auto">
                  <Link to="/login" className="logo">
                    <img src={logo} alt="" className="w-100 mCS_img_loaded" />
                  </Link>
                </div>
                <nav className="nav nav-tabs border-bottom-0">
                  <div className="tab-content w-100" id="nav-tabContent">
                    <div className="tab-pane active show fade text-center mt-3 pt-1">
                      <h3 className="form-title text-center">{heading}</h3>
                      <div className="dz-separator-outer m-b5">
                        <div className="dz-separator bg-primary style-liner"></div>
                      </div>
                      <p>{subHeading}</p>
                    </div>
                  </div>
                </nav>
                <div className="d-flex flex-column w-100 scroll-container">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
