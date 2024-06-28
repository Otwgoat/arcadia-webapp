import React, { useContext, useEffect, useState } from "react";
import { List, XCircle } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../CustomButton";
import AuthContext, { useAuth } from "../../context/AuthContext";
import authApi from "../../services/authApi";
import HeaderLinkContainer from "../HeaderLinkContainer";
const DashboardHeader = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isActive, setIsActive] = useState("dashboard");
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
              linkClassName={isActive === "dashboard" ? "navLinkActive" : ""}
              path="/dashboard"
              title="Dashboard"
            />
            <div id="loginButtonContainer">
              {isAuthenticated ? (
                <CustomButton
                  buttonClassName="mediumLogoutButton"
                  id="logoutButton"
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
  );
};

export default DashboardHeader;
