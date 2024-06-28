import React, { useEffect, useRef, useState } from "react";
import CustomButton from "../../CustomButton";
import animalsApi from "../../../services/animalsApi";

const UpdateAnimalForm = ({ animal, habitats }) => {
  const formRef = useRef(formRef);
  useEffect(() => {
    if (animal) {
      setNewName(animal.firstName || "");
      setNewSpecies(animal.race || "");
      setNewBirthDate(animal.birthDate || "");
      setNewHabitat(animal.habitatId.id);
      setNewDescription(animal.description || "");
      setNewGender(animal.gender || "");
    }
  }, [animal]);

  const [newName, setNewName] = useState("");
  const [newSpecies, setNewSpecies] = useState("");
  const [newBirthDate, setNewBirthDate] = useState("");
  const [newHabitat, setNewHabitat] = useState();
  const [newDescription, setNewDescription] = useState("");
  const [newGender, setNewGender] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({
    firstName: "",
    race: "",
    birthDate: "",
    habitat: "",
    description: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedAnimalData = {
      id: animal.id,
      firstName: newName,
      race: newSpecies,
      birthDate: newBirthDate,
      habitatId: newHabitat,
      description: newDescription,
      gender: newGender,
    };
    try {
      await animalsApi.updateAnimal(updatedAnimalData);
      setSubmitSuccess(true);
      setSuccessMessage("Animal modifié");
    } catch (error) {
      if (error.response && error.response.data) {
        const violations = error.response.data.violations;
        if (violations) {
          const apiErrors = {};
          violations.forEach(({ propertyPath, title }) => {
            apiErrors[propertyPath] = title;
          });
          setErrors(apiErrors);
        }
      }
    }
  };

  return (
    <form ref={formRef} method="PUT">
      <label className="formLabel" htmlFor="animalName">
        Nom de l'animal
      </label>
      <input
        type="text"
        className="formInput"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      {errors.firstName && <p className="errorMessage">{errors.firstName}</p>}
      <label className="formLabel" htmlFor="animalSpecies">
        Espèce de l'animal
      </label>
      <input
        className="formInput"
        type="text"
        defaultValue={newSpecies}
        onChange={(e) => setNewSpecies(e.target.value)}
      />
      {errors.race && <p className="errorMessage">{errors.race}</p>}
      <label className="formLabel" htmlFor="animalBirthDate">
        Date de naissance
      </label>
      <input
        type="date"
        className="formInput"
        defaultValue={newBirthDate}
        onChange={(e) => setNewBirthDate(e.target.value)}
      />
      {errors.birthDate && <p className="errorMessage">{errors.birthDate}</p>}
      <label htmlFor="animalHabitat" className="formLabel">
        Habitat de l'animal
      </label>
      <select
        name="animalHabitat"
        id="animalHabitat"
        className="formInput selectInput"
        value={newHabitat}
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
        defaultValue={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
      />
      {errors.description && (
        <p className="errorMessage">{errors.description}</p>
      )}
      <label htmlFor="animalGender" className="formLabel">
        Sexe de l'animal
      </label>
      <select
        name="animalGender"
        id="animalGender"
        className="formInput selectInput"
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
        onClick={handleSubmit}
      />
    </form>
  );
};

export default UpdateAnimalForm;
