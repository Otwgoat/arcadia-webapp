import React from "react";
import DashboardNavItem from "../DashboardNavItem";

const AdminDashboard = () => {
  return (
    <>
      <div className="heroTitle dashboardHeroTitle">
        <h1>José</h1>
        <h3>Administrateur</h3>
      </div>
      <div className="dashboardNav">
        <DashboardNavItem
          path="/dashboard/admin/utilisateurs"
          title="Gérer les utilisateurs"
        />
        <DashboardNavItem
          path="/dashboard/admin/services"
          title="Gérer les horaires et services"
        />
        <DashboardNavItem
          path="/dashboard/admin/animaux"
          title="Gérer les animaux"
        />
        <DashboardNavItem
          path="/dashboard/admin/habitats"
          title="Gérer les habitats"
        />
        <DashboardNavItem
          path="/"
          title="Consulter les rapports vétérinaires"
        />
      </div>
    </>
  );
};

export default AdminDashboard;
