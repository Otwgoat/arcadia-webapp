import React, { useState } from "react";
import DashboardHeader from "../../components/dashboards/DashboardHeader";
import PrevLink from "../../components/dashboards/admin/PrevLink";
import DashboardNavItem from "../../components/dashboards/DashboardNavItem";
import ReportsByAnimal from "../../components/dashboards/admin/ReportsByAnimal";
import ReportsByDate from "../../components/dashboards/admin/ReportsByDate";
import CustomButton from "../../components/CustomButton";
import { useMediaQuery } from "react-responsive";

const VeterinaryReportsDashboardPage = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const [isActive, setIsActive] = useState("");

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
              isActive === "filterByName" ? "Fermer" : "Filtrer par animal"
            }
            dashboardNavItemClassName={
              isActive === "filterByName"
                ? "dashboardNavItem active"
                : "dashboardNavItem"
            }
            onClick={() =>
              setIsActive(isActive === "filterByName" ? "" : "filterByName")
            }
          />

          {isActive === "filterByName" && !isDesktop && <ReportsByAnimal />}
          <DashboardNavItem
            title={isActive === "filterByDate" ? "Fermer" : "Filtrer par date"}
            dashboardNavItemClassName={
              isActive === "filterByDate"
                ? "dashboardNavItem active"
                : "dashboardNavItem"
            }
            onClick={() =>
              setIsActive(isActive === "filterByDate" ? "" : "filterByDate")
            }
          />
          {isActive === "filterByName" && isDesktop && <ReportsByAnimal />}
          {isActive === "filterByDate" && <ReportsByDate />}
        </div>
        {isDesktop && (
          <CustomButton
            id="prevButton"
            buttonClassName="mediumDesktopButton"
            title="Revenir au dashboard"
            path="/dashboard"
          />
        )}
      </div>
    </div>
  );
};

export default VeterinaryReportsDashboardPage;
