import React from "react";
import SearchContainer from "../../SearchContainer";
import animalsApi from "../../../services/animalsApi";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const SearchAnimal = (props) => {
  const navigate = useNavigate();
  const {
    data: animals,
    error,
    isLoading,
  } = useQuery({ queryKey: ["animals"], queryFn: animalsApi.getAnimals });
  if (isLoading) {
    return console.log(isLoading);
  }
  if (error) {
    console.log("An error occured:" + error.message);
  }

  const handleDeleteAnimal = async (animalId) => {
    try {
      await animalsApi.deleteAnimal(animalId);
    } catch (error) {
      console.error("Error in deleteAnimal API call:", error);
      throw error;
    }
  };

  const resultTemplate = (item) => {
    return (
      <h3 onClick={() => navigateOnClick(item)}>
        {item.id} {item.firstName}
      </h3>
    );
  };
  const navigateOnClick = (item) => {
    console.log(item);
    navigate(`/dashboard/admin/animal/:${item.id}`, {
      state: { animal: item, habitats: props.habitatsData },
    });
  };
  return (
    <>
      <SearchContainer
        searchContainerId="searchAnimal"
        label="Rechercher un animal"
        inputName="searchAnimal"
        inputPlaceholder="Nom de l'animal"
        iterableTerm="firstName"
        resultTemplate={resultTemplate}
        data={animals}
        deleteOnClick={handleDeleteAnimal}
      />
    </>
  );
};

export default SearchAnimal;
