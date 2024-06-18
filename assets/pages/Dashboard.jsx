import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import authApi from "../services/authApi";
import AdminDashboard from "../components/dashboards/admin/AdminDashboard";
import DashboardHeader from "../components/dashboards/DashboardHeader";
import CustomButton from "../components/CustomButton";

const Dashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const userRole = authApi.getUserType();
  const [startRedirect, setStartRedirect] = useState(false);

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
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/connexion");
    }
  }, [isAuthenticated]);

  return (
    <div className="container">
      <DashboardHeader />
      <main className="pageContainer dashboardContainer">
        {userRole === "admin" ? <AdminDashboard /> : ""}
        <CustomButton
          buttonClassName="largeLogoutButton"
          title="Déconnexion"
          onClick={handleLogout}
        />
      </main>
    </div>
  );
};

export default Dashboard;
