import React, { useEffect, useState } from "react";
import PlanningFormGroup from "./PlanningFormGroup";
import CustomButton from "../../CustomButton";
import servicesApi from "../../../services/servicesApi";
import { useQuery } from "@tanstack/react-query";

const PlanningUpdateForm = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [updated, setUpdated] = useState(false);
  const {
    data: planning,
    isLoading,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ["planning"],
    queryFn: servicesApi.getPlanning,
    staleTime: 2000,
  });
  if (isLoading) {
    console.log("planning is loading...");
  }
  if (error) {
    console.log("An error occured:" + error.message);
  }

  const [planningFormState, setPlanningFormState] = useState({
    Mardi: { ouverture: "", fermeture: "" },
    Mercredi: { ouverture: "", fermeture: "" },
    Jeudi: { ouverture: "", fermeture: "" },
    Vendredi: { ouverture: "", fermeture: "" },
    Samedi: { ouverture: "", fermeture: "" },
    Dimanche: { ouverture: "", fermeture: "" },
    "Ouvertures exceptionnelles": { ouverture: "", fermeture: "" },
    Restaurant: { ouverture: "", fermeture: "" },
  });

  const handleChangePlanningInput = (day, field, value) => {
    setUpdated(true);
    setPlanningFormState((prevState) => ({
      ...prevState,
      [day]: {
        ...prevState[day],
        [field]: value,
      },
    }));
  };
  useEffect(() => {
    setPlanningFormState(planning);
  }, [planning]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (updated) {
      console.log(planningFormState);
      try {
        servicesApi.updatePlanning(planningFormState);
        setSuccessMessage("Horaires mis à jour avec succès");
        setSubmitSuccess(true);
      } catch (error) {
        console.log("An error occured:" + error.message);
      }
    } else {
      return setErrorMessage(
        "Veuillez modifier les horaires avant de soumettre le formulaire"
      );
    }
  };

  return (
    <form method="PUT">
      {planning &&
        Object.keys(planning).map((day) => (
          <PlanningFormGroup
            key={day}
            dayName={day}
            opening={`${day}Opening`}
            closing={`${day}Opening`}
            dayPlanning={planning[day]}
            onChange={(field, value) =>
              handleChangePlanningInput(day, field, value)
            }
          />
        ))}

      {errorMessage && <p className="errorMessage">{errorMessage}</p>}
      <CustomButton
        buttonClassName="mediumMobileButton"
        title="Mettre à jour"
        successMessage={successMessage}
        submitSuccess={submitSuccess}
        type="submit"
        onClick={handleSubmit}
      />
    </form>
  );
};

export default PlanningUpdateForm;
