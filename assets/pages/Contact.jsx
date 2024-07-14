import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import PrevLink from "../components/dashboards/admin/PrevLink";
import { ValidationError, useForm } from "@formspree/react";
import CustomButton from "../components/CustomButton";
import Footer from "../components/Footer";
import { useMediaQuery } from "react-responsive";

const Contact = () => {
  const contactForm = useRef("contactForm");
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const [state, handleSubmit, reset] = useForm(
    process.env.REACT_APP_FORMSPREE_ENDPOINT
  );
  useEffect(() => {
    console.log(state);
    if (state.succeeded) {
      contactForm.current.reset();
    }
  }, [state]);
  return (
    <div className="container">
      <Header pageActive="contact" />
      <div className="pageContainer " id="contactFormContainer">
        {isDesktop ? null : <PrevLink link="/" title="Retour à l'accueil" />}
        <div className="heroTitle">
          <h1>Contact</h1>
          <h3>Nous envoyer un message</h3>
        </div>
        <form
          ref={contactForm}
          onSubmit={handleSubmit}
          method="POST"
          id="contactForm"
        >
          <label htmlFor="name" className="formLabel">
            Votre nom
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="formInput"
            required
          />
          <ValidationError prefix="name" field="name" errors={state.errors} />
          <label htmlFor="firstName" className="formLabel">
            Votre prénom
          </label>
          <input
            type="text"
            name="firstname"
            id="firstName"
            className="formInput"
            required
          />
          <ValidationError
            prefix="firstname"
            field="firstname"
            errors={state.errors}
          />
          <label htmlFor="email" className="formLabel" required>
            Votre email
          </label>
          <input type="email" name="email" id="email" className="formInput" />
          <ValidationError prefix="email" field="email" errors={state.errors} />
          <label htmlFor="message" className="formLabel">
            Votre message
          </label>
          <textarea name="message" id="message" className="input" required />
          <ValidationError
            prefix="message"
            field="message"
            errors={state.errors}
          />
          <CustomButton
            type="submit"
            title="Envoyer"
            buttonClassName={
              isDesktop ? "mediumDesktopButton" : "mediumMobileButton"
            }
            disabled={state.submitting}
            submitSuccess={state.succeeded}
            successMessage="Message envoyé"
          />
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
