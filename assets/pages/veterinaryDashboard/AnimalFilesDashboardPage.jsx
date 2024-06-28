import React, { useState } from "react";
import DashboardHeader from "../../components/dashboards/DashboardHeader";
import PrevLink from "../../components/dashboards/admin/PrevLink";
import habitatsApi from "../../services/habitatsApi";
import { useQuery } from "@tanstack/react-query";
import AnimalFiles from "../../components/dashboards/veterinary/AnimalFiles";

const AnimalFilesDashboardPage = () => {
  const [habitatId, setHabitatId] = useState();
  const [animalId, setAnimalId] = useState();
  const [selectHabitatError, setSelectHabitatError] = useState();
  const [displayAnimalsList, setDisplayAnimalsList] = useState(false);
  const [displayAnimalCard, setDisplayAnimalCard] = useState(false);
  const { data: habitats, error } = useQuery({
    queryKey: ["habitats"],
    queryFn: habitatsApi.getHabitats,
  });
  if (error) {
    setSelectHabitatError("Erreur lors du chargement des habitats");
  }
  const selectOnChange = (value) => {
    setHabitatId(value);
    setDisplayAnimalsList(true);
    if (value === "") {
      setDisplayAnimalsList(false);
    }
  };
  const { data: animals } = useQuery({
    queryKey: ["animals", habitatId],
    queryFn: () => habitatsApi.getAnimals(habitatId),
  });
  const selectAnimalOnChange = (value) => {
    setDisplayAnimalCard(true);
    setAnimalId(value);
    if (value === "") {
      setDisplayAnimalCard(false);
    }
  };
  return (
    <div className="container">
      <DashboardHeader />
      <div className="pageContainer dashboardContainer">
        <PrevLink link="/dashboard" title="Revenir au dashboard" />
        <div className="heroTitle">
          <h1>Dossier animal</h1>
          <h3>Consulter le dossier d'un animal</h3>
        </div>
        <form>
          <label htmlFor="animalHabitat" className="formLabel">
            Séléctionner un habitat
          </label>
          <select
            id="animalHabitat"
            className="formInput selectInput"
            onChange={(e) => selectOnChange(e.target.value)}
          >
            <option value="">Séléctionner un habitat</option>
            {habitats &&
              habitats.map((habitat) => (
                <option key={habitat.id} value={habitat.id}>
                  {habitat.name}
                </option>
              ))}
          </select>
          {selectHabitatError && (
            <p className="errorMessage">{selectHabitatError}</p>
          )}
          {displayAnimalsList && (
            <>
              <label htmlFor="animalsList" className="formLabel">
                Séléctionner un animal
              </label>
              <select
                id="animalsList"
                className="formInput selectInput"
                onChange={(e) => selectAnimalOnChange(e.target.value)}
              >
                <option value="">Séléctionner un animal</option>
                {animals &&
                  animals.map((animal) => (
                    <option key={animal.id} value={animal.id}>
                      {animal.firstName} - {animal.race}
                    </option>
                  ))}
              </select>
            </>
          )}
        </form>
        {displayAnimalCard && <AnimalFiles animalId={animalId} />}
      </div>
    </div>
  );
};

export default AnimalFilesDashboardPage;
