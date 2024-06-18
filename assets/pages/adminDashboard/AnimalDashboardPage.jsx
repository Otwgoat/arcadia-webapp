import React, { useRef, useState } from "react";
import DashboardHeader from "../../components/dashboards/DashboardHeader";
import PrevLink from "../../components/dashboards/admin/PrevLink";
import { useLocation } from "react-router-dom";
import CustomButton from "../../components/CustomButton";

const AnimalDashboardPage = () => {
  const formRef = useRef(formRef);
  const location = useLocation();
  const animal = location.state.animal;
  const habitats = location.state.habitats;
  const [newName, setNewName] = useState(animal.firstName);
  const [newSpecies, setNewSpecies] = useState(animal.race);
  const [newBirthDate, setNewBirthDate] = useState(animal.birthDate);
  const [newHabitat, setNewHabitat] = useState(animal.habitatId);
  const [newDescription, setNewDescription] = useState(animal.description);
  const [newGender, setNewGender] = useState(animal.gender);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  return (
    <div className="container">
      <DashboardHeader />

      <div className="pageContainer dashboardContainer">
        <PrevLink link="/dashboard/admin/animaux" title="Dashboard précédent" />
        <div className="heroTitle">
          <h1>{animal.firstName}</h1>
          <h3>Informations sur l'animal</h3>
        </div>
      </div>
      <form ref={formRef}>
        <label className="formLabel" htmlFor="animalName">
          Nom de l'animal
        </label>
        <input
          type="text"
          className="formInput"
          defaultValue={animal.firstName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <label className="formLabel" htmlFor="animalSpecies">
          Espèce de l'animal
        </label>
        <input
          className="formInput"
          type="text"
          defaultValue={animal.race}
          onChange={(e) => setNewSpecies(e.target.value)}
        />
        <label className="formLabel" htmlFor="animalBirthDate">
          Date de naissance
        </label>
        <input
          type="text"
          className="formInput"
          defaultValue={animal.birthDate}
          onChange={(e) => setNewBirthDate(e.target.value)}
        />
        <label htmlFor="animalHabitat" className="formLabel">
          Habitat de l'animal
        </label>
        <select
          name="animalHabitat"
          id="animalHabitat"
          className="formInput"
          defaultValue={animal.habitatId}
          onChange={(e) => setNewHabitat(e.target.value)}
        >
          {habitats &&
            habitats.map((habitat) => (
              <option key={habitat.id} value={habitat.id}>
                {habitat.name}
              </option>
            ))}
        </select>
        <label htmlFor="animalDescription" className="formLabel">
          Description de l'animal
        </label>
        <textarea
          name="animalDescription"
          id="animalDescription"
          className="input"
          defaultValue={animal.description}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <label htmlFor="animalGender" className="formLabel">
          Sexe de l'animal
        </label>
        <select
          name="animalGender"
          id="animalGender"
          className="formInput"
          onChange={(e) => setNewGender(e.target.value)}
        >
          <option value="male">Mâle</option>
          <option value="female">Femelle</option>
        </select>
        <CustomButton
          id="updateAnimal"
          buttonClassName="mediumMobileButton"
          title="Modifier l'animal"
          type="submit"
          successMessage={successMessage}
          submitSuccess={submitSuccess}
        />
      </form>
    </div>
  );
};

export default AnimalDashboardPage;
