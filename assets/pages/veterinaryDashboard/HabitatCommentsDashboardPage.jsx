import React, { useRef, useState } from "react";
import DashboardHeader from "../../components/dashboards/DashboardHeader";
import PrevLink from "../../components/dashboards/admin/PrevLink";
import habitatsApi from "../../services/habitatsApi";
import { useQuery } from "@tanstack/react-query";
import CustomButton from "../../components/CustomButton";
import { useMediaQuery } from "react-responsive";

const HabitatCommentsDashboardPage = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const formRef = useRef(formRef);
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Les mois commencent à 0
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const [successMessage, setSuccessMessage] = useState();
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [selectHabitatError, setSelectHabitatError] = useState();
  const [displayForm, setDisplayForm] = useState(false);
  const [habitatId, setHabitatId] = useState();
  const [reportDate, setReportDate] = useState(getTodayDate());
  const [report, setReport] = useState();
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
    setDisplayForm(true);
    if (value === "") {
      setDisplayForm(false);
    }
  };

  const checkData = () => {
    const errors = {};

    if (reportDate > getTodayDate()) {
      errors.reportDate =
        "La date ne peut pas être ultérieure à la date d'aujourd'hui.";
    }
    if (!report || report === "") {
      errors.description = "Veuillez renseigner un commentaire.";
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
      habitatId: habitatId,
      date: reportDate,
      report: report,
    };
    try {
      await habitatsApi.createReport(reportData);
      setSuccessMessage("Rapport créé avec succès");
      setSubmitSuccess(true);
      formRef.current.reset();
      setDisplayForm(false);
      setHabitatId();
      setReport();
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
          <h1>État de l'habitat</h1>
          <h3>Commenter l'état d'un habitat</h3>
        </div>
        <form ref={formRef} method="POST">
          <label htmlFor="habitat" className="formLabel">
            Séléctionner un habitat
          </label>
          <select
            id="habitat"
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
          {displayForm && (
            <>
              <label htmlFor="reportDate" className="formLabel">
                Date du commentaire
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
              <label htmlFor="report" className="formLabel">
                Commentaire
              </label>
              <textarea
                id="report"
                name="report"
                className={errors.description ? "formInputError" : "input"}
                onChange={(e) => setReport(e.target.value)}
              />
              {errors.description && (
                <p className="errorMessage">{errors.description}</p>
              )}
              <CustomButton
                title="Envoyer le commentaire"
                type="submit"
                buttonClassName={
                  isDesktop ? "smallDesktopButton" : "mediumMobilebutton"
                }
                onClick={(e) => handleSubmit(e)}
                successMessage={successMessage}
                submitSuccess={submitSuccess}
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

export default HabitatCommentsDashboardPage;
