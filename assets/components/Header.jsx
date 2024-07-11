import { List, XCircle } from "@phosphor-icons/react";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "./CustomButton";
import AuthContext, { useAuth } from "../context/AuthContext";
import authApi from "../services/authApi";
import HeaderLinkContainer from "./HeaderLinkContainer";
import { useMediaQuery } from "react-responsive";

const Header = ({ pageActive }) => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isActive, setIsActive] = useState(pageActive);
  const [startRedirect, setStartRedirect] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const handleLogout = () => {
    authApi.logout();
    setIsAuthenticated(false);
    setStartRedirect(true);
  };
  useEffect(() => {
    if (startRedirect === true) {
      navigate("/");
    }
  }, [startRedirect]);

  return (
    <>
      {!isDesktop ? (
        <header>
          <div className="logoContainer"></div>
          {menuOpen ? (
            <div id="hamburgerMenu" className="menuActive">
              <div className="menuIcon">
                <XCircle
                  size={40}
                  weight="light"
                  color="#fdf5e9"
                  onClick={() => setMenuOpen(!menuOpen)}
                />
              </div>
              <nav>
                <HeaderLinkContainer
                  linkClassName={
                    isActive === "home" ? "navLinkActive" : "navLink"
                  }
                  path="/"
                  title="Accueil"
                />
                <HeaderLinkContainer
                  linkClassName={
                    isActive === "services" ? "navLinkActive" : "navLink"
                  }
                  path="/services"
                  title="Services"
                />

                <HeaderLinkContainer
                  linkClassName={
                    isActive === "habitats" ? "navLinkActive" : "navLink"
                  }
                  path="/habitats"
                  title="Habitats"
                />

                <HeaderLinkContainer
                  linkClassName={
                    isActive === "contact" ? "navLinkActive" : "navLink"
                  }
                  path="/contact"
                  title="Contact"
                  onClick={() => setIsActive("contact")}
                />
                <div id="loginButtonContainer">
                  {isAuthenticated ? (
                    <CustomButton
                      buttonClassName="mediumLogoutButton"
                      title="Déconnexion"
                      onClick={handleLogout}
                    />
                  ) : (
                    <CustomButton
                      buttonClassName="mediumMobileButton"
                      title="Connexion"
                      path="/connexion"
                    />
                  )}
                </div>
              </nav>
            </div>
          ) : (
            <div className="menuIcon">
              <List
                size={40}
                weight="light"
                color="#fdf5e9"
                onClick={() => setMenuOpen(!menuOpen)}
              />
            </div>
          )}
        </header>
      ) : (
        <header>
          <div className="logoContainer"></div>
          <nav>
            <HeaderLinkContainer
              linkClassName={isActive === "home" ? "navLinkActive" : "navLink"}
              path="/"
              title="Accueil"
            />
            <HeaderLinkContainer
              linkClassName={
                isActive === "services" ? "navLinkActive" : "navLink"
              }
              path="/services"
              title="Services"
            />

            <HeaderLinkContainer
              linkClassName={
                isActive === "habitats" ? "navLinkActive" : "navLink"
              }
              path="/habitats"
              title="Habitats"
            />

            <HeaderLinkContainer
              linkClassName={
                isActive === "contact" ? "navLinkActive" : "navLink"
              }
              path="/contact"
              title="Contact"
            />
            <div id="loginButtonContainer">
              {isAuthenticated ? (
                <CustomButton
                  buttonClassName="smallDesktopLogoutButton"
                  title="Déconnexion"
                  onClick={handleLogout}
                />
              ) : (
                <CustomButton
                  buttonClassName="smallDesktopButton"
                  title="Connexion"
                  path="/connexion"
                />
              )}
            </div>
          </nav>
        </header>
      )}
    </>
  );
};

export default Header;
