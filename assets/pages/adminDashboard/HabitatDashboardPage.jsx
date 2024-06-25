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

const HabitatDashboardPage = () => {
  const [habitatDataOpen, setHabitatDataOpen] = useState(false);
  const [updateHabitatImageOpen, setUpdateHabitatImageOpen] = useState(false);
  const [animalsListOpen, setAnimalsListOpen] = useState(false);
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

  const handleDelete = async (habitatId) => {
    try {
      await habitatsApi.deleteHabitat(habitatId);
    } catch (error) {
      setDeleteError(error.response.data.error);
      console.log(error);
    }
  };
  useEffect(() => {
    if (location.state?.habitatId) {
      setHabitatId(location.state.habitatId);
      console.log(location.state.habitatId);
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
              habitatDataOpen
                ? "Fermer"
                : "Modifier les informations de l'habitat"
            }
            dashboardNavItemClassName={
              habitatDataOpen ? "dashboardNavItem active" : "dashboardNavItem"
            }
            onClick={() => setHabitatDataOpen(!habitatDataOpen)}
          />
          {habitatDataOpen && habitat && (
            <UpdateHabitatForm habitat={habitat && habitat} />
          )}
          <DashboardNavItem
            title={
              updateHabitatImageOpen
                ? "Fermer"
                : "Modifier les images de l'habitat"
            }
            dashboardNavItemClassName={
              updateHabitatImageOpen
                ? "dashboardNavItem active"
                : "dashboardNavItem"
            }
            onClick={() => setUpdateHabitatImageOpen(!updateHabitatImageOpen)}
          />
          {updateHabitatImageOpen && (
            <UpdateHabitatImages habitat={habitat && habitat} />
          )}
          <DashboardNavItem
            title={animalsListOpen ? "Fermer" : "Liste des animaux"}
            dashboardNavItemClassName={
              animalsListOpen ? "dashboardNavItem active" : "dashboardNavItem"
            }
            onClick={() => setAnimalsListOpen(!animalsListOpen)}
          />
          {animalsListOpen && <AnimalsList habitat={habitat && habitat} />}
          {deleteError && <p className="errorMessage">{deleteError}</p>}
          <CustomButton
            buttonClassName="mediumLogoutButton"
            id="deleteButton"
            title="Supprimer l'habitat"
            onClick={() => handleDelete(habitatId)}
          />
        </div>
      </div>
    </div>
  );
};

export default HabitatDashboardPage;
