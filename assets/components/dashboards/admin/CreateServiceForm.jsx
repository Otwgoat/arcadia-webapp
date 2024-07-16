import React, { useEffect, useRef, useState } from "react";
import CustomButton from "../../CustomButton";
import servicesApi from "../../../services/servicesApi";
import { useMediaQuery } from "react-responsive";

const CreateServiceForm = (props) => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const formRef = useRef(formRef);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState();
  /**
   * Function that handles the API endpoint for creating or updating a service.
   * @returns {Promise} A promise that resolves with the API response.
   */
  const apiEndpoint = () => {
    const serviceData = {
      title: title,
      description: description,
    };
    if (props.isUpdate) {
      if (serviceData.title === "") {
        serviceData.title = props.defaultServiceTitle;
      }
      if (serviceData.description === "") {
        serviceData.description = props.defaultServiceDescription;
      }
      return servicesApi.updateService(props.serviceId, serviceData);
    } else {
      return servicesApi.createService(serviceData);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    try {
      await apiEndpoint();
      if (props.isUpdate === false) {
        formRef.current.reset();
      }
      setErrors({});
      if (props.isUpdate) {
        setSuccessMessage("Service modifié avec succès");
      } else {
        setSuccessMessage("Service créé avec succès");
      }
      setSubmitSuccess(true);
      setTitle("");
      setDescription("");
    } catch (error) {
      if (error.response && error.response.data) {
        const violations = error.response.data;
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
  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        setSuccessMessage("");
      }, 1000);
    }
  }, [successMessage]);
  return (
    <form ref={formRef} method={props.formMethod}>
      {isDesktop ? <p className="subh1">Créer un service</p> : null}
      <label className="formLabel" htmlFor="serviceTitle">
        Titre du service
      </label>
      <input
        className={errors.title ? "formInputError" : "formInput"}
        type="text"
        id="serviceTitle"
        name="serviceTitle"
        defaultValue={props.defaultServiceTitle}
        onChange={(e) => setTitle(e.target.value)}
      />
      {errors.title && <p className="errorMessage">{errors.title}</p>}
      <label className="formLabel" htmlFor="serviceDescription">
        Description du service
      </label>
      <textarea
        className={errors.description ? "formInputError" : "input"}
        name="serviceDescription"
        id="serviceDescription"
        defaultValue={props.defaultServiceDescription}
        onChange={(e) => setDescription(e.target.value)}
      />
      {errors.description && (
        <p className="errorMessage">{errors.description}</p>
      )}

      <CustomButton
        buttonClassName={
          isDesktop ? "smallDesktopButton" : "mediumMobileButton"
        }
        title={props.submitButtonTitle}
        successMessage={successMessage}
        submitSuccess={submitSuccess}
        type="submit"
        onClick={handleSubmit}
      />
    </form>
  );
};

export default CreateServiceForm;
