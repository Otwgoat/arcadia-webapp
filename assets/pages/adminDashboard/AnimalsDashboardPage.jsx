import React, { useState } from "react";
import DashboardHeader from "../../components/dashboards/DashboardHeader";
import PrevLink from "../../components/dashboards/admin/PrevLink";
import DashboardNavItem from "../../components/dashboards/DashboardNavItem";
import CreateAnimalForm from "../../components/dashboards/admin/CreateAnimalForm";
import SearchAnimal from "../../components/dashboards/admin/SearchAnimal";
import habitatsApi from "../../services/habitatsApi";
import { useQuery } from "@tanstack/react-query";

const AnimalsDashboardPage = () => {
  const { data: habitats, isError } = useQuery({
    queryKey: ["habitats"],
    queryFn: habitatsApi.getHabitats,
  });
  if (isError) {
    return setErrorMessage(
      "Une erreur est survenue lors du chargement des habitats."
    );
  }
  const [createAnimalFormOpen, setCreateAnimalFormOpen] = useState(false);
  const [animalsSearchBarOpen, setAnimalsSearchBarOpen] = useState(false);
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
              createAnimalFormOpen ? "Annuler la création" : "Créer un animal"
            }
            dashboardNavItemClassName={
              createAnimalFormOpen
                ? "dashboardNavItem active"
                : "dashboardNavItem"
            }
            onClick={() => setCreateAnimalFormOpen(!createAnimalFormOpen)}
          />
          {createAnimalFormOpen ? (
            <CreateAnimalForm habitatsData={habitats} />
          ) : (
            ""
          )}
          <DashboardNavItem
            title={
              animalsSearchBarOpen
                ? "Fermer la recherche"
                : "Rechercher un animal"
            }
            dashboardNavItemClassName={
              animalsSearchBarOpen
                ? "dashboardNavItem active"
                : "dashboardNavItem"
            }
            onClick={() => setAnimalsSearchBarOpen(!animalsSearchBarOpen)}
          />
          {animalsSearchBarOpen ? <SearchAnimal habitatsData={habitats} /> : ""}
        </div>
      </div>
    </div>
  );
};

export default AnimalsDashboardPage;
