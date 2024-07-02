import React, { useState } from "react";
import DashboardHeader from "../../components/dashboards/DashboardHeader";
import PrevLink from "../../components/dashboards/admin/PrevLink";
import DashboardNavItem from "../../components/dashboards/DashboardNavItem";
import ReportsByAnimal from "../../components/dashboards/admin/ReportsByAnimal";
import ReportsByDate from "../../components/dashboards/admin/ReportsByDate";

const VeterinaryReportsDashboardPage = () => {
  const [reportsFilteredByAnimalNameOpen, setReportsFilteredByAnimalNameOpen] =
    useState(false);
  const [reportsFilteredByDateOpen, setReportsFilteredByDateOpen] =
    useState(false);

  return (
    <div className="container">
      <DashboardHeader />
      <div className="pageContainer dashboardContainer">
        <PrevLink link="/dashboard" title="Revenir au dashboard" />
        <div className="heroTitle">
          <h1>Rapports vétérinaires</h1>
          <h3>Consulter les rapports vétérinaires</h3>
        </div>
        <div className="dashboardNav">
          <DashboardNavItem
            title={
              reportsFilteredByAnimalNameOpen ? "Fermer" : "Filtrer par animal"
            }
            dashboardNavItemClassName={
              reportsFilteredByAnimalNameOpen
                ? "dashboardNavItem active"
                : "dashboardNavItem"
            }
            onClick={() =>
              setReportsFilteredByAnimalNameOpen(
                !reportsFilteredByAnimalNameOpen
              )
            }
          />

          {reportsFilteredByAnimalNameOpen && <ReportsByAnimal />}
          <DashboardNavItem
            title={reportsFilteredByDateOpen ? "Fermer" : "Filtrer par date"}
            dashboardNavItemClassName={
              reportsFilteredByDateOpen
                ? "dashboardNavItem active"
                : "dashboardNavItem"
            }
            onClick={() =>
              setReportsFilteredByDateOpen(!reportsFilteredByDateOpen)
            }
          />
          {reportsFilteredByDateOpen && <ReportsByDate />}
        </div>
      </div>
    </div>
  );
};

export default VeterinaryReportsDashboardPage;
