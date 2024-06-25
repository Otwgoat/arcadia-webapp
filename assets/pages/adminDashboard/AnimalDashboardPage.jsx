import React, { useEffect, useRef, useState } from "react";
import DashboardHeader from "../../components/dashboards/DashboardHeader";
import PrevLink from "../../components/dashboards/admin/PrevLink";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CustomButton from "../../components/CustomButton";
import UpdateAnimalForm from "../../components/dashboards/admin/UpdateAnimalForm";
import { useQuery } from "@tanstack/react-query";
import habitatsApi from "../../services/habitatsApi";
import animalsApi from "../../services/animalsApi";
import DashboardNavItem from "../../components/dashboards/DashboardNavItem";
import UpdateAnimalImages from "../../components/dashboards/admin/UpdateAnimalImages";
import { deleteFile } from "../../services/firebase";
const AnimalDashboardPage = () => {
  const navigate = useNavigate();
  const [deleteError, setDeleteError] = useState();
  const formRef = useRef(formRef);
  const location = useLocation();
  const [newLink, setNewLink] = useState(
    location.state?.link || "/dashboard/admin/animaux"
  );
  const [newLinkTitle, setNewLinkTitle] = useState(
    location.state?.linkTitle || "Dashboard précédent"
  );
  const [animal, setAnimal] = useState(location.state?.animal);
  const { id: paramAnimalId } = useParams();
  const [animalId, setAnimalId] = useState(
    location.state?.animal?.id || paramAnimalId.split(":")[1]
  );
  const { data: habitats } = useQuery({
    queryKey: ["habitats"],
    queryFn: habitatsApi.getHabitats,
  });
  const { data: animaldata } = useQuery({
    queryKey: ["animal", animalId],
    queryFn: () => animalsApi.getAnimal(animalId),
    enabled: !!animalId,
  });
  const [habitatsData, setHabitatsData] = useState();
  const [animalDataOpen, setAnimalDataOpen] = useState(false);
  const [updateAnimalImageOpen, setUpdateAnimalImageOpen] = useState(false);
  const handleDeleteAnimal = async (animalId) => {
    try {
      await animalsApi.deleteAnimal(animalId);
      navigate("/dashboard/admin/animaux");
    } catch (error) {
      console.error("Error in deleteAnimal API call:", error);
      throw error;
    }
  };
  useEffect(() => {
    setHabitatsData(habitats);
  }, [habitats]);

  return (
    <div className="container">
      <DashboardHeader />

      <div className="pageContainer dashboardContainer">
        <PrevLink link={newLink} title={newLinkTitle} />
        <div className="heroTitle">
          <h1>{animaldata && animaldata.firstName}</h1>
          <h3>Informations sur l'animal</h3>
        </div>
        <div className="dashboardNav">
          <DashboardNavItem
            title={
              animalDataOpen
                ? "Fermer"
                : "Modifier les informations de l'animal"
            }
            dashboardNavItemClassName={
              animalDataOpen ? "dashboardNavItem active" : "dashboardNavItem"
            }
            onClick={() => setAnimalDataOpen(!animalDataOpen)}
          />

          {animalDataOpen && animaldata && (
            <UpdateAnimalForm
              animal={animaldata && animaldata}
              habitats={habitatsData}
            />
          )}

          <DashboardNavItem
            title={
              updateAnimalImageOpen
                ? "Fermer"
                : "Modifier les photos de l'animal"
            }
            dashboardNavItemClassName={
              updateAnimalImageOpen
                ? "dashboardNavItem active"
                : "dashboardNavItem"
            }
            onClick={() => setUpdateAnimalImageOpen(!updateAnimalImageOpen)}
          />
          {updateAnimalImageOpen && (
            <UpdateAnimalImages animal={animaldata && animaldata} />
          )}
          {deleteError && <p className="errorMessage">{deleteError}</p>}
          <CustomButton
            buttonClassName="mediumLogoutButton"
            id="deleteButton"
            title="Supprimer l'animal"
            onClick={() => handleDeleteAnimal(animalId)}
          />
        </div>
      </div>
    </div>
  );
};

export default AnimalDashboardPage;
