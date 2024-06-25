import React, { useEffect, useRef, useState } from "react";
import CustomButton from "../../CustomButton";
import habitatsApi from "../../../services/habitatsApi";

const UpdateHabitatForm = ({ habitat }) => {
  useEffect(() => {
    if (habitat) {
      setNewName(habitat.name || "");
      setNewDescription(habitat.description || "");
    }
  }, [habitat]);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    description: "",
  });
  const formRef = useRef(formRef);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedHabitatData = {
      id: habitat.id,
      name: newName,
      description: newDescription,
    };
    try {
      await habitatsApi.updateHabitat(updatedHabitatData);
      setSubmitSuccess(true);
      setSuccessMessage("Habitat modifié");
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
      <label htmlFor="habitatName" className="formLabel">
        Nom de l'habitat
      </label>
      <input
        type="text"
        className={errors.name ? "formInputError" : "formInput"}
        defaultValue={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      {errors.name && <p className="errorMessage">{errors.name}</p>}
      <label htmlFor="habitatDescription" className="formLabel">
        Description de l'habitat
      </label>
      <textarea
        name="habitatDescription"
        id="habitatDescription"
        className={errors.description ? "formInputError" : "input"}
        defaultValue={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
      />
      {errors.description && (
        <p className="errorMessage">{errors.description}</p>
      )}
      <CustomButton
        id="updateHabitatButton"
        buttonClassName="mediumMobileButton"
        title="Modifier l'habitat"
        type="submit"
        successMessage={successMessage}
        submitSuccess={submitSuccess}
        onClick={handleSubmit}
      />
    </form>
  );
};

export default UpdateHabitatForm;
