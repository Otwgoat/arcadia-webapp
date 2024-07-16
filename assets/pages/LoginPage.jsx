import React, { useContext, useState } from "react";
import Header from "../components/Header";
import CustomButton from "../components/CustomButton";
import Footer from "../components/Footer";
import AuthContext, { useAuth } from "../context/AuthContext";
import authApi from "../services/authApi";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { Helmet } from "react-helmet-async";

const LoginPage = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated, setCurrentUser } = useAuth();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errors, setErrors] = useState();
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  /**
   * Handles the form submission for the login page.
   *
   * @param {Event} e - The form submission event.
   * @returns {Promise<void>} - A promise that resolves when the authentication is successful.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    let credentials = {};
    if (validateEmail(email)) {
      credentials = {
        username: email,
        password: password,
      };
    } else {
      return setErrors("L'adresse email fournie n'est pas valide.");
    }
    try {
      await authApi.authenticate(credentials);
      setErrors("");
      setIsAuthenticated(true);
      navigate("/dashboard");
    } catch (error) {
      setErrors(
        "Aucun compte ne possède cette adresse email, ou alors les informations ne correspondent pas."
      );
    }
  };
  return (
    <>
      <Helmet>
        <title>Arcadia Zoo - Connexion</title>
      </Helmet>
      <div className="container">
        <Header />
        <main className="pageContainer" id="loginFormContainer">
          <h1>Connexion</h1>
          <p className="subh1">
            Connexion reservée aux employés et vétérinaires du parc.
          </p>
          <form>
            <label htmlFor="email" className="formLabel">
              Email
            </label>
            <input
              className="formInput"
              type="text"
              id="email"
              name="email"
              value={email ?? ""}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password" className="formLabel">
              Mot de passe
            </label>
            <input
              className="formInput"
              type="password"
              id="password"
              name="password"
              value={password ?? ""}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors && <p className="errorMessage">{errors}</p>}
            <CustomButton
              id="postLoginFormButton"
              title="Se connecter"
              buttonClassName={
                isDesktop ? "mediumDesktopButton" : "largeMobileButton"
              }
              type="submit"
              onClick={handleSubmit}
            />
          </form>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default LoginPage;
