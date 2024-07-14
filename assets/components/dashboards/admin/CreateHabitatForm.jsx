import React, { useEffect, useRef, useState } from "react";
import CustomButton from "../../CustomButton";

import { uploadFile } from "../../../services/firebase";
import habitatsApi from "../../../services/habitatsApi";
import { useMediaQuery } from "react-responsive";

const CreateHabitatForm = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const formRef = useRef(formRef);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    description: "",
  });
  const [selectImagesError, setSelectImagesError] = useState();
  const [files, setFiles] = useState();
  const [principalSelectedFile, setPrincipalSelectedFile] = useState();
  const [imagesLoading, setImagesLoading] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [habitatName, setHabitatName] = useState("");
  const [habitatDescription, setHabitatDescription] = useState("");
  const [newHabitatId, setNewHabitatId] = useState();

  async function postFormData() {
    const habitatData = {
      name: habitatName,
      description: habitatDescription,
    };
    try {
      const response = await habitatsApi.createHabitat(habitatData);
      setNewHabitatId(response.id);
      return response.id;
    } catch (error) {
      throw error;
    }
  }
  const handleSubmit = async (e) => {
    setErrors({});
    e.preventDefault();
    try {
      const habitatId = await postFormData();
      if (!files) {
        setSelectImagesError(
          "Habitat créé sans images, il sera possible d'en ajouter ultérieurement."
        );
        formRef.current.reset();
        setSuccessMessage("Habitat créé avec succès");
        setSubmitSuccess(true);
      }
      const uploadPromises = files.map((file) =>
        uploadFile(
          file,
          habitatId,
          setImagesLoading,
          setFiles,
          "habitats",
          principalSelectedFile
        )
      );
      await Promise.all(uploadPromises).then(() => {
        setImagesLoaded(true);
      });
      setSuccessMessage("Habitat créé avec succès");
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
    const realFileInput = document.getElementById("habitatImages");
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
          <p className={file.progress < 100 ? "loading" : "fileSelectedName"}>
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
      <label htmlFor="habitatName" className="formLabel">
        Nom de l'habitat
      </label>
      <input
        type="text"
        id="habitatName"
        name="habitatName"
        className={errors.name ? "formInputError" : "formInput"}
        onChange={(e) => setHabitatName(e.target.value)}
      />
      {errors.name && <p className="errorMessage">{errors.name}</p>}
      <label htmlFor="habitatDescription" className="formLabel">
        Description de l'habitat
      </label>
      <textarea
        name="habitatDescription"
        id="habitatDescription"
        className={errors.description ? "formInputError" : "input"}
        onChange={(e) => setHabitatDescription(e.target.value)}
      />
      {errors.description && (
        <p className="errorMessage">{errors.description}</p>
      )}
      <label htmlFor="habitatImages" className="formLabel">
        Images de l'habitat
      </label>
      <input
        type="file"
        name="habitatImages"
        id="habitatImages"
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
        id="createHabitatButton"
        buttonClassName={
          isDesktop ? "smallDesktopButton" : "mediumMobileButton"
        }
        title="Créer l'habitat"
        successMessage={successMessage}
        submitSuccess={submitSuccess}
        type="submit"
        onClick={(e) => handleSubmit(e)}
      />
    </form>
  );
};

export default CreateHabitatForm;
