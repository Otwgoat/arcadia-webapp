import React, { useState } from "react";
import DashboardHeader from "../../components/dashboards/DashboardHeader";
import PrevLink from "../../components/dashboards/admin/PrevLink";
import DashboardNavItem from "../../components/dashboards/DashboardNavItem";
import CreateAnimalForm from "../../components/dashboards/admin/CreateAnimalForm";
import SearchAnimal from "../../components/dashboards/admin/SearchAnimal";
import habitatsApi from "../../services/habitatsApi";
import { useQuery } from "@tanstack/react-query";
import CustomButton from "../../components/CustomButton";
import { useMediaQuery } from "react-responsive";

const AnimalsDashboardPage = () => {
  const [isActive, setIsActive] = useState("");
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const { data: habitats, isError } = useQuery({
    queryKey: ["habitats"],
    queryFn: habitatsApi.getHabitats,
  });
  if (isError) {
    return setErrorMessage(
      "Une erreur est survenue lors du chargement des habitats."
    );
  }

  return (
    <div className="container">
      <DashboardHeader />
      <div className="pageContainer dashboardContainer">
        <PrevLink link="/dashboard" title="Revenir au dashboard" />
        <div className="heroTitle">
          <h1>Animaux</h1>
          <h3>Gestion des animaux</h3>
        </div>
        <div className="dashboardNav">
          <DashboardNavItem
            title={
              isActive === "createForm"
                ? "Annuler la création"
                : "Créer un animal"
            }
            dashboardNavItemClassName={
              isActive === "createForm"
                ? "dashboardNavItem active"
                : "dashboardNavItem"
            }
            onClick={() =>
              isActive !== "createForm"
                ? setIsActive("createForm")
                : setIsActive("")
            }
          />
          {isActive === "createForm" && !isDesktop ? (
            <CreateAnimalForm habitatsData={habitats} />
          ) : null}
          <DashboardNavItem
            title={
              isActive === "searchAnimals"
                ? "Fermer la recherche"
                : "Rechercher un animal"
            }
            dashboardNavItemClassName={
              isActive === "searchAnimals"
                ? "dashboardNavItem active"
                : "dashboardNavItem"
            }
            onClick={() =>
              isActive !== "searchAnimals"
                ? setIsActive("searchAnimals")
                : setIsActive("")
            }
          />
          {isActive === "searchAnimals" ? (
            <SearchAnimal habitatsData={habitats} />
          ) : null}
          {isDesktop && isActive === "createForm" ? (
            <CreateAnimalForm habitatsData={habitats} />
          ) : null}
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

export default AnimalsDashboardPage;
