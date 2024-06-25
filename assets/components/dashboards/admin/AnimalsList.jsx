import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import habitatsApi from "../../../services/habitatsApi";
import { ArrowSquareIn } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

const AnimalsList = ({ habitat }) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState();
  const { data: animals, error } = useQuery({
    queryKey: ["animals"],
    queryFn: () => habitatsApi.getAnimals(habitat.id),
  });
  if (error) {
    setErrorMessage(
      "Une erreur est survenue, merci de réesayer ou de patienter."
    );
  }

  const navigateOnClick = (item, habitat) => {
    navigate(`/dashboard/admin/animal/${item.id}`, {
      state: {
        animal: item,
        habitatId: habitat.id,
        link: `/dashboard/admin/habitat/${habitat.id}`,
        linkTitle: `Retour à l'habitat ${habitat.name}`,
      },
    });
  };

  return (
    <div className="listContainer">
      {animals ? (
        animals.map((animal, index) => (
          <div
            key={animal.id}
            className="listItem"
            onClick={() => navigateOnClick(animal, habitat)}
          >
            <div
              className={`listItemContent ${index % 2 === 0 ? "even" : "odd"}`}
            >
              <h3>
                {animal.id} {animal.firstName}
              </h3>
              <div className="listItemActions">
                <ArrowSquareIn size={20} weight="light" color="#fdf5e9" />
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="errorMessage">{errorMessage}</p>
      )}
    </div>
  );
};

export default AnimalsList;
