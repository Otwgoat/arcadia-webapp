import React, { useState } from "react";
import DashboardHeader from "../../components/dashboards/DashboardHeader";
import PrevLink from "../../components/dashboards/admin/PrevLink";
import DashboardNavItem from "../../components/dashboards/DashboardNavItem";
import CreateHabitatForm from "../../components/dashboards/admin/CreateHabitatForm";
import HabitatsList from "../../components/dashboards/admin/HabitatsList";

const HabitatsDashboardPage = () => {
  const [createHabitatFormOpen, setCreateHabitatFormOpen] = useState(false);
  const [habitatsListOpen, setHabitatsListOpen] = useState(false);

  return (
    <div className="container">
      <DashboardHeader />
      <div className="pageContainer dashboardContainer">
        <PrevLink link="/dashboard" title="Revenir au dashboard" />
        <div className="heroTitle">
          <h1>Habitats</h1>
          <h3>Gestion des habitats</h3>
        </div>
        <div className="dashboardNav">
          <DashboardNavItem
            title={
              createHabitatFormOpen ? "Annuler la création" : "Créer un habitat"
            }
            dashboardNavItemClassName={
              createHabitatFormOpen
                ? "dashboardNavItem active"
                : "dashboardNavItem"
            }
            onClick={() => setCreateHabitatFormOpen(!createHabitatFormOpen)}
          />
          {createHabitatFormOpen && <CreateHabitatForm />}
        </div>
        <DashboardNavItem
          title={habitatsListOpen ? "Fermer" : "Liste des habitats"}
          dashboardNavItemClassName={
            habitatsListOpen ? "dashboardNavItem active" : "dashboardNavItem"
          }
          onClick={() => setHabitatsListOpen(!habitatsListOpen)}
        />
        {habitatsListOpen && <HabitatsList />}
      </div>
    </div>
  );
};

export default HabitatsDashboardPage;
