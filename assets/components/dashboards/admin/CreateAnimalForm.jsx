import React, { useEffect, useRef, useState } from "react";
import CustomButton from "../../CustomButton";
import animalsApi from "../../../services/animalsApi";
import { uploadFile } from "../../../services/firebase";
import { useMediaQuery } from "react-responsive";

const CreateAnimalForm = (props) => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const formRef = useRef(formRef);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({
    firstName: "",
    race: "",
    birthDate: "",
    habitatId: "",
    description: "",
    gender: "",
    images: "",
  });
  const [selectImagesError, setSelectImagesError] = useState();
  const [files, setFiles] = useState();
  const [principalSelectedFile, setPrincipalSelectedFile] = useState();
  const [imagesData, setImagesData] = useState([]);
  const [imagesLoading, setImagesLoading] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [animalName, setAnimalName] = useState("");
  const [animalRace, setAnimalRace] = useState("");
  const [animalBirthDate, setAnimalBirthDate] = useState("");
  const [animalHabitat, setAnimalHabitat] = useState(1);
  const [animalDescription, setAnimalDescription] = useState("");
  const [animalGender, setAnimalGender] = useState("male");
  const [newAnimalId, setNewAnimalId] = useState();

  async function postFormData() {
    const animalData = {
      firstName: animalName,
      race: animalRace,
      birthDate: animalBirthDate,
      habitatId: animalHabitat,
      description: animalDescription,
      gender: animalGender,
    };
    try {
      const response = await animalsApi.createAnimal(animalData);
      setNewAnimalId(response.id);
      return response.id;
    } catch (error) {
      throw error;
    }
  }

  const handleSubmit = async (e) => {
    setErrors({});
    e.preventDefault();
    try {
      const animalId = await postFormData();
      const uploadPromises = files.map((file) =>
        uploadFile(
          file,
          animalId,
          setImagesLoading,
          setFiles,
          "animals",
          principalSelectedFile
        )
      );
      const uploadedFiles = await Promise.all(uploadPromises).then(() => {
        setImagesLoaded(true);
      });
      setSuccessMessage("Animal créé avec succès");
      setSubmitSuccess(true);
      formRef.current.reset();
      setFiles();
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

  const handleButtonClick = () => {
    setSelectImagesError();
    const realFileInput = document.getElementById("animalImages");
    if (realFileInput) {
      realFileInput.click();
    } else {
      console.error("No file input found");
    }
  };

  const fileSelectedPlaceholder = (file, index) => {
    if (imagesLoading) {
      return (
        <>
          <p className={file.progress < 100 ? "loading" : ""}>
            {file.name} : {file.progress}%
          </p>
        </>
      );
    } else {
      return (
        <>
          <p
            onClick={() => setPrincipalSelectedFile(files[index])}
            className={
              files[index] === principalSelectedFile
                ? "principaleFileSelected"
                : ""
            }
          >
            {file.name}
          </p>
        </>
      );
    }
  };
  useEffect(() => {
    if (selectImagesError) {
      const timer = setTimeout(() => {
        setSelectImagesError("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [selectImagesError]);
  return (
    <form ref={formRef} onSubmit={handleSubmit} method="POST">
      <label htmlFor="animalName" className="formLabel">
        Nom de l'animal
      </label>
      <input
        type="text"
        id="animalName"
        name="animalName"
        className={errors.firstName ? "formInputError" : "formInput"}
        onChange={(e) => setAnimalName(e.target.value)}
      />
      {errors.firstName && <p className="errorMessage">{errors.firstName}</p>}
      <label htmlFor="animalSpecies" className="formLabel">
        Espèce de l'animal
      </label>
      <input
        type="text"
        id="animalSpecies"
        name="animalSpecies"
        className={errors.race ? "formInputError" : "formInput"}
        onChange={(e) => setAnimalRace(e.target.value)}
      />
      {errors.race && <p className="errorMessage">{errors.race}</p>}
      <label className="formLabel" htmlFor="animalBirthDate">
        Jour de naissance
      </label>
      <input
        type="date"
        id="animalBirthDate"
        name="animalBirthDate"
        className={errors.birthDate ? "formInputError" : "formInput"}
        onChange={(e) => setAnimalBirthDate(e.target.value)}
      />
      {errors.birthDate && <p className="errorMessage">{errors.birthDate}</p>}
      <label htmlFor="animalHabitat" className="formLabel">
        Habitat de l'animal
      </label>
      <select
        name="animalHabitat"
        id="animalHabitat"
        className="formInput selectInput"
        onChange={(e) => setAnimalHabitat(e.target.value)}
      >
        {props.habitatsData &&
          props.habitatsData.map((habitat) => (
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
        className={errors.description ? "formInputError" : "input"}
        onChange={(e) => setAnimalDescription(e.target.value)}
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
        onChange={(e) => setAnimalGender(e.target.value)}
      >
        <option value="male">Mâle</option>
        <option value="female">Femelle</option>
      </select>
      <label htmlFor="animalImages" className="formLabel">
        Images de l'animal
      </label>
      <input
        type="file"
        name="animalImages"
        id="animalImages"
        multiple
        onChange={(e) => setFiles(Array.from(e.target.files))}
      />
      <CustomButton
        id="selectImagesButton"
        type="button"
        title="Sélectionner des images"
        buttonClassName={
          isDesktop ? "mediumDesktopButton" : "mediumMobileButton"
        }
        onClick={handleButtonClick}
      />
      {selectImagesError && <p className="errorMessage">{selectImagesError}</p>}
      {files && files.length > 0 && (
        <div className="filesSelectedList">
          <p className="infoMessage">
            Veuillez cliquer sur un des fichiers sélectionnés pour enregistrer
            l'image comme "principale".
          </p>
          {files &&
            files.map((image, index) => (
              <div key={index}>{fileSelectedPlaceholder(image, index)}</div>
            ))}
        </div>
      )}
      {errors.images && <p className="errorMessage">{errors.images}</p>}

      <CustomButton
        id="createAnimalButton"
        buttonClassName={
          isDesktop ? "smallDesktopButton" : "mediumMobileButton"
        }
        title="Créer l'animal"
        successMessage={successMessage}
        submitSuccess={submitSuccess}
        type="submit"
        onClick={(e) => handleSubmit(e)}
      />
    </form>
  );
};

export default CreateAnimalForm;
