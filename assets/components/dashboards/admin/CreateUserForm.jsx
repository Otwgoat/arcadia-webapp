import React, { useEffect, useRef, useState } from "react";
import CustomButton from "../../CustomButton";
import { Eye, EyeClosed } from "@phosphor-icons/react";
import userApi from "../../../services/userApi";
import { useMediaQuery } from "react-responsive";

const CreateUserForm = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const formRef = useRef(formRef);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [userType, setUserType] = useState("Employé");
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [password, setPassword] = useState();
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({});
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
  const handleShowPassword = () => {
    setPasswordShown(!passwordShown);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    const userData = {
      type: userType,
      email: email,
      firstName: capitalizeFirstLetter(firstname),
      lastName: capitalizeFirstLetter(lastname),
      password: password,
    };
    if (password === "" || password === undefined) {
      setErrors({ password: "Veuillez entrer un mot de passe." });
    }
    try {
      await userApi.createUser(userData);
      formRef.current.reset();
      setErrors({});
      setSuccessMessage("Utilisateur créé avec succès.");
      setSubmitSuccess(true);
      setUserType("Employé");
      setEmail("");
      setFirstname("");
      setLastname("");
      setPassword("");
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
      if (
        error.response.data.error ===
        "Un utilisateur avec cet e-mail existe déjà."
      ) {
        setErrors({
          email: "Un utilisateur avec cette adresse email existe déjà.",
        });
      }
    }
  };

  return (
    <form method="POST" ref={formRef}>
      {isDesktop && <p className="subh1">Créer un utilisateur </p>}
      <label className="formLabel" htmlFor="userType">
        Type d'utilisateur
      </label>
      <select
        name="userType"
        id="userType"
        className="formInput selectInput"
        onChange={(e) => setUserType(e.target.value)}
      >
        <option value="Employé">Employé</option>
        <option value="Vétérinaire">Vétérinaire</option>
      </select>
      <label className="formLabel" htmlFor="email">
        Adresse email
      </label>
      <input
        type="text"
        className={errors.email ? "formInputError" : "formInput"}
        id="emailField"
        name="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      {errors.email && <p className="errorMessage">{errors.email}</p>}
      <label className="formLabel" htmlFor="password">
        Mot de passe
      </label>
      <input
        type={passwordShown ? "text" : "password"}
        className={errors.password ? "formInputError" : "formInput"}
        id="passwordField"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {errors.password && <p className="errorMessage">{errors.password}</p>}
      <label className="formLabel" htmlFor="firstname">
        Prénom
      </label>
      <input
        type="text"
        className={errors.firstName ? "formInputError" : "formInput"}
        id="firstnameField"
        name="firstname"
        onChange={(e) => setFirstname(e.target.value)}
      />
      {errors.firstName && <p className="errorMessage">{errors.firstName}</p>}
      <label htmlFor="lastname" className="formLabel">
        Nom de famille
      </label>
      <input
        type="text"
        className={errors.lastName ? "formInputError" : "formInput"}
        id="lastnameField"
        name="lastname"
        onChange={(e) => setLastname(e.target.value)}
      />
      {errors.lastName && <p className="errorMessage">{errors.lastName}</p>}
      <CustomButton
        type="submit"
        buttonClassName={
          isDesktop ? "mediumDesktopButton" : "mediumMobileButton"
        }
        title="Envoyer"
        successMessage={successMessage}
        submitSuccess={submitSuccess}
        onClick={handleSubmit}
      />
      ’
    </form>
  );
};

export default CreateUserForm;
