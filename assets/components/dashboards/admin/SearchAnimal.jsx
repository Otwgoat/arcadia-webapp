import React from "react";
import SearchContainer from "../../SearchContainer";
import animalsApi from "../../../services/animalsApi";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ArrowSquareIn } from "@phosphor-icons/react";
import { useMediaQuery } from "react-responsive";

const SearchAnimal = (props) => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
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

  const resultTemplate = (item) => {
    return (
      <>
        {isDesktop ? (
          <p className="subh1" onClick={() => navigateOnClick(item)}>
            {item.id} {item.firstName}
          </p>
        ) : (
          <h3 onClick={() => navigateOnClick(item)}>
            {item.id} {item.firstName}
          </h3>
        )}
        <ArrowSquareIn size={20} weight="light" color="#fdf5e9" />
      </>
    );
  };
  const navigateOnClick = (item) => {
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
      />
    </>
  );
};

export default SearchAnimal;
