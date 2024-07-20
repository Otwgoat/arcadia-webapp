import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import authApi from "../services/authApi";
import AdminDashboard from "../components/dashboards/admin/AdminDashboard";
import DashboardHeader from "../components/dashboards/DashboardHeader";
import CustomButton from "../components/CustomButton";
import VeterinaryDashboard from "../components/dashboards/veterinary/VeterinaryDashboard";
import EmployeeDashboard from "../components/dashboards/employee/EmployeeDashboard";
import { useMediaQuery } from "react-responsive";

const Dashboard = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const navigate = useNavigate();
  const { isAuthenticated, currentUser, setIsAuthenticated, logout } =
    useAuth();
  const [startRedirect, setStartRedirect] = useState(false);

  const handleLogout = () => {
    logout();
    setStartRedirect(true);
  };
  useEffect(() => {
    if (startRedirect === true) {
      navigate("/");
    }
  }, [startRedirect]);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/connexion");
    }
  }, [isAuthenticated]);

  return (
    <div className="container" id="dashboardContainer">
      <DashboardHeader />
      <main className="pageContainer dashboardContainer">
        {currentUser.type === "Admin" ? <AdminDashboard /> : ""}
        {currentUser.type === "Vétérinaire" ? (
          <VeterinaryDashboard currentUser={currentUser} />
        ) : (
          ""
        )}
        {currentUser.type === "Employé" ? (
          <EmployeeDashboard currentUser={currentUser} />
        ) : (
          ""
        )}
        <CustomButton
          buttonClassName={
            isDesktop ? "smallDesktopLogoutButton" : "largeLogoutButton"
          }
          title="Déconnexion"
          onClick={handleLogout}
        />
      </main>
    </div>
  );
};

export default Dashboard;
