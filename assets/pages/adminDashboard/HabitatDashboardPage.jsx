import React, { useEffect, useState } from "react";
import DashboardHeader from "../../components/dashboards/DashboardHeader";
import PrevLink from "../../components/dashboards/admin/PrevLink";
import { useLocation, useParams } from "react-router-dom";
import habitatsApi from "../../services/habitatsApi";
import { useQuery } from "@tanstack/react-query";
import DashboardNavItem from "../../components/dashboards/DashboardNavItem";
import UpdateHabitatForm from "../../components/dashboards/admin/UpdateHabitatForm";
import CustomButton from "../../components/CustomButton";
import UpdateHabitatImages from "../../components/dashboards/admin/UpdateHabitatImages";
import AnimalsList from "../../components/dashboards/admin/AnimalsList";
import { useMediaQuery } from "react-responsive";

const HabitatDashboardPage = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const [isActive, setIsActive] = useState("");
  const [deleteError, setDeleteError] = useState();
  const location = useLocation();
  const { id: paramHabitatId } = useParams();
  const [habitatId, setHabitatId] = useState(
    paramHabitatId.includes(":") ? paramHabitatId.split(":")[1] : paramHabitatId
  );
  const { data: habitat } = useQuery({
    queryKey: ["habitat", habitatId],
    queryFn: () => habitatsApi.getHabitat(habitatId),
    enabled: !!habitatId,
  });

  /**
   * Deletes a habitat with the specified ID.
   *
   * @param {string} habitatId - The ID of the habitat to delete.
   * @returns {Promise<void>} - A promise that resolves when the habitat is deleted.
   */
  const handleDelete = async (habitatId) => {
    try {
      await habitatsApi.deleteHabitat(habitatId);
    } catch (error) {
      setDeleteError(error.response.data.error);
    }
  };
  useEffect(() => {
    if (location.state?.habitatId) {
      setHabitatId(location.state.habitatId);
    }
  }, [location.state]);
  return (
    <div className="container">
      <DashboardHeader />
      <div className="pageContainer dashboardContainer">
        <PrevLink
          link="/dashboard/admin/habitats"
          title="Revenir à la liste des habitats"
        />
        <div className="heroTitle">
          <h1>{habitat && habitat.name}</h1>
          <h3>Informations sur l'habitat</h3>
        </div>
        <div className="dashboardNav">
          <DashboardNavItem
            title={
              isActive === "habitatData"
                ? "Fermer"
                : "Modifier les informations de l'habitat"
            }
            dashboardNavItemClassName={
              isActive === "habitatData"
                ? "dashboardNavItem active"
                : "dashboardNavItem"
            }
            onClick={() =>
              isActive === "habitatData"
                ? setIsActive("")
                : setIsActive("habitatData")
            }
          />
          {isActive && "habitatData" && !isDesktop && habitat && (
            <UpdateHabitatForm habitat={habitat && habitat} />
          )}
          <DashboardNavItem
            title={
              isActive === "updateHabitatImage"
                ? "Fermer"
                : "Modifier les images de l'habitat"
            }
            dashboardNavItemClassName={
              isActive === "updateHabitatImage"
                ? "dashboardNavItem active"
                : "dashboardNavItem"
            }
            onClick={() =>
              isActive === "updateHabitatImage"
                ? setIsActive("")
                : setIsActive("updateHabitatImage")
            }
          />
          {isActive === "updateHabitatImage" && !isDesktop && (
            <UpdateHabitatImages habitat={habitat && habitat} />
          )}
          <DashboardNavItem
            title={isActive === "animalList" ? "Fermer" : "Liste des animaux"}
            dashboardNavItemClassName={
              isActive === "animalList"
                ? "dashboardNavItem active"
                : "dashboardNavItem"
            }
            onClick={() =>
              isActive === "animalList"
                ? setIsActive("")
                : setIsActive("animalList")
            }
          />
          {isActive === "animalList" && (
            <AnimalsList habitat={habitat && habitat} />
          )}
          {isActive === "habitatData" && isDesktop && habitat && (
            <UpdateHabitatForm habitat={habitat && habitat} />
          )}
          {isActive === "updateHabitatImage" && isDesktop && (
            <UpdateHabitatImages habitat={habitat && habitat} />
          )}
          {deleteError && <p className="errorMessage">{deleteError}</p>}
        </div>
        <CustomButton
          buttonClassName={
            isDesktop ? "smallDesktopLogoutButton" : "mediumLogoutButton"
          }
          id="deleteButton"
          title="Supprimer l'habitat"
          onClick={() => handleDelete(habitatId)}
        />
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

export default HabitatDashboardPage;
