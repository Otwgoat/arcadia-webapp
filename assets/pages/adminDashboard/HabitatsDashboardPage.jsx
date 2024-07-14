import React, { useState } from "react";
import DashboardHeader from "../../components/dashboards/DashboardHeader";
import PrevLink from "../../components/dashboards/admin/PrevLink";
import DashboardNavItem from "../../components/dashboards/DashboardNavItem";
import CreateHabitatForm from "../../components/dashboards/admin/CreateHabitatForm";
import HabitatsList from "../../components/dashboards/admin/HabitatsList";
import { useMediaQuery } from "react-responsive";
import CustomButton from "../../components/CustomButton";

const HabitatsDashboardPage = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const [isActive, setIsActive] = useState("");

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
              isActive === "createForm"
                ? "Annuler la création"
                : "Créer un habitat"
            }
            dashboardNavItemClassName={
              isActive === "createForm"
                ? "dashboardNavItem active"
                : "dashboardNavItem"
            }
            onClick={() =>
              isActive === "createForm"
                ? setIsActive("")
                : setIsActive("createForm")
            }
          />
          {isActive === "createForm" && !isDesktop && <CreateHabitatForm />}

          <DashboardNavItem
            title={
              isActive === "habitatsList" ? "Fermer" : "Liste des habitats"
            }
            dashboardNavItemClassName={
              isActive === "habitatsList"
                ? "dashboardNavItem active"
                : "dashboardNavItem"
            }
            onClick={() =>
              isActive === "habitatsList"
                ? setIsActive("")
                : setIsActive("habitatsList")
            }
          />
          {isActive === "createForm" && isDesktop && <CreateHabitatForm />}
          {isActive === "habitatsList" && <HabitatsList />}
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

export default HabitatsDashboardPage;
