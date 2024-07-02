import React from "react";
import DashboardNavItem from "../DashboardNavItem";

const EmployeeDashboard = ({ currentUser }) => {
  return (
    <>
      <div className="heroTitle dashboardHeroTitle">
        <h1>
          {currentUser.firstName} {currentUser.lastName}
        </h1>
        <h3>Mon espace employé</h3>
      </div>
      <div className="dashboardNav">
        <DashboardNavItem
          path="/dashboard/employe/rapport-alimentation"
          title="Créer un rapport d'alimentation"
        />
        <DashboardNavItem
          path="/dashboard/employe/validation-avis"
          title="Valider des avis visiteurs"
        />
        <DashboardNavItem
          path="/dashboard/employe/modification-services"
          title="Mettre à jour les services du zoo"
        />
      </div>
    </>
  );
};

export default EmployeeDashboard;
