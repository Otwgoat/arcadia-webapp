import React, { useState } from "react";
import habitatsApi from "../../services/habitatsApi";
import { useQuery } from "@tanstack/react-query";

const SelectAnimal = ({ selectAnimalOnChange }) => {
  const [selectHabitatError, setSelectHabitatError] = useState("");
  const [displayAnimalsList, setDisplayAnimalsList] = useState(false);

  const [habitatId, setHabitatId] = useState();
  const { data: habitats, error } = useQuery({
    queryKey: ["habitats"],
    queryFn: habitatsApi.getHabitats,
  });
  if (error) {
    setSelectHabitatError("Erreur lors du chargement des habitats");
  }

  /**
   * Handles the change event of the select input.
   *
   * @param {string} value - The selected value from the select input.
   * @returns {void}
   */
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
  return (
    <>
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
    </>
  );
};

export default SelectAnimal;
