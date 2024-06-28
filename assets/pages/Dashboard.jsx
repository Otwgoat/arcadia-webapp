import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import authApi from "../services/authApi";
import AdminDashboard from "../components/dashboards/admin/AdminDashboard";
import DashboardHeader from "../components/dashboards/DashboardHeader";
import CustomButton from "../components/CustomButton";
import VeterinaryDashboard from "../components/dashboards/veterinary/VeterinaryDashboard";

const Dashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, currentUser, setIsAuthenticated } = useAuth();
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
        {currentUser.type === "Admin" ? <AdminDashboard /> : ""}
        {currentUser.type === "Vétérinaire" ? (
          <VeterinaryDashboard currentUser={currentUser} />
        ) : (
          ""
        )}
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
