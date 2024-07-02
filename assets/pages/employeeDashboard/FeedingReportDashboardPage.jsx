import React, { useRef, useState } from "react";
import DashboardHeader from "../../components/dashboards/DashboardHeader";
import habitatsApi from "../../services/habitatsApi";
import CustomButton from "../../components/CustomButton";
import { useQuery } from "@tanstack/react-query";
import PrevLink from "../../components/dashboards/admin/PrevLink";
import animalsApi from "../../services/animalsApi";

const FeedingReportDashboardPage = () => {
  const getTodayDateTime = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const hours = String(today.getHours()).padStart(2, "0");
    const minutes = String(today.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };
  const formRef = useRef(formRef);
  const [successMessage, setSuccessMessage] = useState();
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [selectHabitatError, setSelectHabitatError] = useState();
  const [displayForm, setDisplayForm] = useState(false);
  const [habitatId, setHabitatId] = useState();
  const [animalId, setAnimalId] = useState();
  const [reportDate, setReportDate] = useState(getTodayDateTime());
  const [foodType, setFoodType] = useState();
  const [foodAmount, setFoodAmount] = useState();
  const [displayAnimalsList, setDisplayAnimalsList] = useState(false);
  const [errors, setErrors] = useState({});

  const { data: habitats, error } = useQuery({
    queryKey: ["habitats"],
    queryFn: habitatsApi.getHabitats,
  });
  if (error) {
    setSelectHabitatError("Erreur lors du chargement des habitats");
  }
  const selectOnChange = (value) => {
    setHabitatId(value);
    setDisplayAnimalsList(true);
    if (value === "") {
      setDisplayAnimalsList(false);
    }
  };
  const { data: animals } = useQuery({
    queryKey: ["animals", habitatId],
    queryFn: () => habitatsApi.getAnimals(habitatId),
  });
  const selectAnimalOnChange = (value) => {
    setDisplayForm(true);
    setAnimalId(value);
    if (value === "") {
      setDisplayForm(false);
    }
  };

  const checkData = () => {
    const errors = {};
    if (reportDate > getTodayDateTime()) {
      errors.reportDate =
        "La date ne peut pas être ultérieure à la date d'aujourd'hui.";
    }
    if (!foodType || foodType === "") {
      errors.foodType = "Veuillez renseigner le type d'aliment.";
    }
    if (!foodAmount || foodAmount === "") {
      errors.foodAmount = "Veuillez renseigner la quantité d'aliment.";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const errors = checkData();
    setErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }
    const reportData = {
      animalId: animalId,
      date: reportDate,
      foodType: foodType,
      foodAmount: foodAmount,
    };
    try {
      await animalsApi.createFeedingReport(reportData);
      setSuccessMessage("Rapport créé avec succès");
      setSubmitSuccess(true);
      formRef.current.reset();
      setDisplayForm(false);
      setDisplayAnimalsList(false);
      setHabitatId();
      setAnimalId();
      setFoodType();
      setFoodAmount();
    } catch (error) {
      setSuccessMessage("Erreur lors de la création du rapport");
      setSubmitSuccess(false);
    }
  };

  return (
    <div className="container">
      <DashboardHeader />
      <div className="pageContainer dashboardContainer">
        <PrevLink link="/dashboard" title="Revenir au dashboard" />
        <div className="heroTitle">
          <h1>Rapport d'alimentation</h1>
          <h3>Créer un rapport d'alimentation</h3>
        </div>
        <form ref={formRef} method="POST">
          <label htmlFor="animalHabitat" className="formLabel">
            Séléctionner un habitat
          </label>
          <select
            id="animalHabitat"
            className="formInput selectInput"
            onChange={(e) => selectOnChange(e.target.value)}
          >
            <option value="">Séléctionner un habitat</option>
            {habitats &&
              habitats.map((habitat) => (
                <option key={habitat.id} value={habitat.id}>
                  {habitat.name}
                </option>
              ))}
          </select>
          {selectHabitatError && (
            <p className="errorMessage">{selectHabitatError}</p>
          )}
          {displayAnimalsList && (
            <>
              <label htmlFor="animalsList" className="formLabel">
                Séléctionner un animal
              </label>
              <select
                id="animalsList"
                className="formInput selectInput"
                onChange={(e) => selectAnimalOnChange(e.target.value)}
              >
                <option value="">Séléctionner un animal</option>
                {animals &&
                  animals.map((animal) => (
                    <option key={animal.id} value={animal.id}>
                      {animal.firstName} - {animal.race}
                    </option>
                  ))}
              </select>
            </>
          )}
          {displayForm && (
            <>
              <label htmlFor="reportDate" className="formLabel">
                Date et heure de la prise de repas
              </label>
              <input
                type="dateTime-local"
                id="reportDate"
                className={errors.reportDate ? "formInputError" : "formInput"}
                defaultValue={reportDate}
                onChange={(e) => setReportDate(e.target.value)}
              />
              {errors.reportDate && (
                <p className="errorMessage">{errors.reportDate}</p>
              )}
              <label htmlFor="foodType" className="formLabel">
                Aliment
              </label>
              <input
                type="text"
                id="foodType"
                name="foodType"
                className={errors.foodType ? "formInputError" : "formInput"}
                onChange={(e) => setFoodType(e.target.value)}
              />
              {errors.foodType && (
                <p className="errorMessage">{errors.foodType}</p>
              )}
              <label htmlFor="foodAmount" className="formLabel">
                Quantité (en gramme)
              </label>
              <input
                type="number"
                id="foodAmount"
                name="foodAmount"
                className={errors.foodAmount ? "formInputError" : "formInput"}
                onChange={(e) => setFoodAmount(e.target.value)}
              />
              {errors.foodAmount && (
                <p className="errorMessage">{errors.foodAmount}</p>
              )}
              <CustomButton
                title="Envoyer le rapport"
                type="submit"
                buttonClassName="mediumMobileButton"
                successMessage={successMessage}
                submitSuccess={submitSuccess}
                onClick={(e) => handleSubmit(e)}
              />
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default FeedingReportDashboardPage;
