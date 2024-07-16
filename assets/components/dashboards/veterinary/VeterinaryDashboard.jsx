import React from "react";
import { useAuth } from "../../../context/AuthContext";
import DashboardNavItem from "../DashboardNavItem";

const VeterinaryDashboard = ({ currentUser }) => {
  return (
    <>
      <div className="heroTitle dashboardHeroTitle">
        <h1>Dr. {currentUser.lastName}</h1>
        <h3>Mon espace vétérinaire</h3>
      </div>
      <div className="dashboardNav">
        <DashboardNavItem
          path="/dashboard/veterinaire/consultations"
          title="Créer un rapport de consultation"
        />
        <DashboardNavItem
          path="/dashboard/veterinaire/dossier-animal"
          title="Consulter le dossier d'un animal"
        />
        <DashboardNavItem
          path="/dashboard/veterinaire/habitats"
          title="Commenter l'état d'un habitat"
        />
      </div>
    </>
  );
};

export default VeterinaryDashboard;
