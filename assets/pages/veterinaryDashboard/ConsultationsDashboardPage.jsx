import React, { useRef, useState } from "react";
import DashboardHeader from "../../components/dashboards/DashboardHeader";
import PrevLink from "../../components/dashboards/admin/PrevLink";
import habitatsApi from "../../services/habitatsApi";
import { useQuery } from "@tanstack/react-query";
import CustomButton from "../../components/CustomButton";
import veterinaryApi from "../../services/veterinaryReport";
import { useMediaQuery } from "react-responsive";

const ConsultationsDashboardPage = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const formRef = useRef(formRef);
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Les mois commencent à 0
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const [selectHabitatError, setSelectHabitatError] = useState();
  const [displayAnimalsList, setDisplayAnimalsList] = useState(false);
  const [displayForm, setDisplayForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState();
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [animalId, setAnimalId] = useState();
  const [habitatId, setHabitatId] = useState();
  const [reportDate, setReportDate] = useState(getTodayDate());
  const [animalState, setAnimalState] = useState("");
  const [animalStateDetails, setAnimalStateDetails] = useState("");
  const [foodProvided, setFoodProvided] = useState();
  const [foodAmount, setFoodAmount] = useState();
  const [errors, setErrors] = useState({});
  const checkData = () => {
    const errors = {};

    if (reportDate > getTodayDate()) {
      errors.reportDate =
        "La date ne peut pas être ultérieure à la date d'aujourd'hui.";
    }

    if (animalState === "") {
      errors.animalState = "Veuillez sélectionner un état de santé.";
    }

    if (!foodProvided || foodProvided === "") {
      errors.foodProvided = "Veuillez renseigner l'alimentation proposée.";
    }

    if (!foodAmount || foodAmount === "") {
      errors.foodAmount = "Veuillez renseigner la quantité d'aliment.";
    }

    return errors;
  };
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

  const handleSubmit = async (e) => {
    setErrors({});
    e.preventDefault();
    const errors = checkData();
    setErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }
    const data = {
      date: reportDate,
      animalState: animalState,
      foodProvided: foodProvided,
      foodAmountGrams: foodAmount,
      animalStateDetails: animalStateDetails,
      animalId: animalId,
    };

    try {
      await veterinaryApi.createReport(data);
      setSuccessMessage("Rapport créé avec succès");
      setSubmitSuccess(true);
      formRef.current.reset();
      setDisplayForm(false);
      setDisplayAnimalsList(false);
      setAnimalState();
      setFoodProvided();
      setFoodAmount();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <DashboardHeader />
      <div className="pageContainer dashboardContainer">
        <PrevLink link="/dashboard" title="Revenir au dashboard" />
        <div className="heroTitle">
          <h1>Consultations</h1>
          <h3>Créer un rapport</h3>
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
                Date de la consultation
              </label>
              <input
                type="date"
                id="reportDate"
                className={errors.reportDate ? "formInputError" : "formInput"}
                defaultValue={reportDate}
                onChange={(e) => setReportDate(e.target.value)}
              />
              {errors.reportDate && (
                <p className="errorMessage">{errors.reportDate}</p>
              )}
              <label htmlFor="animalStateReport" className="formLabel">
                État de santé de l'animal
              </label>
              <select
                name="animalStateReport"
                id="animalStateReport"
                className="formInput selectInput"
                onChange={(e) => setAnimalState(e.target.value)}
              >
                <option value="">Séléctionner un état</option>
                <option value="Parfaite santé">Parfaite santé</option>
                <option value="Bonne santé">Bonne santé</option>
                <option value="Santé préoccupante">Santé Préoccupante</option>
                <option value="Mauvaise santé">Mauvaise santé</option>
              </select>
              {errors.animalState && (
                <p className="errorMessage">{errors.animalState}</p>
              )}
              <label htmlFor="animalStateDetailsReport" className="formLabel">
                Détails sur l'état de santé (facultatif)
              </label>
              <textarea
                name="animalStateDetailsReport"
                id="animalStateDetailsReport"
                className="input"
                onChange={(e) => setAnimalStateDetails(e.target.value)}
              />
              <label className="formLabel" htmlFor="foodProvided">
                Alimentation proposée
              </label>
              <input
                type="text"
                id="foodProvided"
                name="foodProvided"
                className={errors.foodProvided ? "formInputError" : "formInput"}
                onChange={(e) => setFoodProvided(e.target.value)}
              />
              {errors.foodProvided && (
                <p className="errorMessage">{errors.foodProvided}</p>
              )}
              <label htmlFor="foodAmountGrams" className="formLabel">
                Quantité quotidienne (en gramme)
              </label>
              <input
                type="number"
                className={errors.foodAmount ? "formInputError" : "formInput"}
                name="foodAmountGrams"
                id="foodAmountGrams"
                onChange={(e) => setFoodAmount(e.target.value)}
              />
              {errors.foodAmount && (
                <p className="errorMessage">{errors.foodAmount}</p>
              )}
              <CustomButton
                type="submit"
                id="submitReportButton"
                buttonClassName={
                  isDesktop ? "smallDesktopButton" : "mediumMobileButton"
                }
                title="Créer le rapport"
                successMessage={successMessage}
                submitSuccess={submitSuccess}
                onClick={(e) => handleSubmit(e)}
              />
            </>
          )}
        </form>
        {isDesktop && (
          <CustomButton
            id="prevButton"
            buttonClassName="mediumDesktopButton"
            title="Revenir au dashboard"
            path="/dashboard"
          />
        )}
      </div>
    </div>
  );
};

export default ConsultationsDashboardPage;
