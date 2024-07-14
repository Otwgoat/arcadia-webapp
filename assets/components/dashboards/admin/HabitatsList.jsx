import { useQuery } from "@tanstack/react-query";
import React from "react";
import habitatsApi from "../../../services/habitatsApi";
import { useNavigate } from "react-router-dom";
import { ArrowSquareIn } from "@phosphor-icons/react";
import { useMediaQuery } from "react-responsive";

const HabitatsList = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const { data: habitats, error } = useQuery({
    queryKey: ["habitats"],
    queryFn: habitatsApi.getHabitats,
  });
  if (error) {
    return <p>Une erreur est survenue, merci de réesayer ou de patienter.</p>;
  }
  const navigate = useNavigate();
  const navigateOnClick = (item) => {
    navigate(`/dashboard/admin/habitat/:${item.id}`, {
      state: { habitat: item },
    });
  };

  return (
    <div className="listContainer">
      {habitats &&
        habitats.map((habitat, index) => (
          <div
            key={habitat.id}
            className="listItem"
            onClick={() => navigateOnClick(habitat)}
          >
            <div
              className={`listItemContent ${index % 2 === 0 ? "even" : "odd"}`}
            >
              {isDesktop ? (
                <p className="subh1">
                  {habitat.id} {habitat.name}
                </p>
              ) : (
                <h3>
                  {habitat.id} {habitat.name}
                </h3>
              )}

              <div className="listItemActions">
                <ArrowSquareIn size={20} weight="light" color="#fdf5e9" />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default HabitatsList;
