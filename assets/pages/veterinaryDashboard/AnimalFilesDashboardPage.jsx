import React, { useState } from "react";
import DashboardHeader from "../../components/dashboards/DashboardHeader";
import PrevLink from "../../components/dashboards/admin/PrevLink";
import AnimalFiles from "../../components/dashboards/veterinary/AnimalFiles";
import SelectAnimal from "../../components/dashboards/SelectAnimal";

const AnimalFilesDashboardPage = () => {
  const [animalId, setAnimalId] = useState();
  const [displayAnimalCard, setDisplayAnimalCard] = useState(false);

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
          <SelectAnimal selectAnimalOnChange={selectAnimalOnChange} />
        </form>
        {displayAnimalCard && <AnimalFiles animalId={animalId} />}
      </div>
    </div>
  );
};

export default AnimalFilesDashboardPage;
