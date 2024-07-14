import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import animalsApi from "../../../services/animalsApi";
import CustomButton from "../../CustomButton";

const ReportsByDate = () => {
  const [reports, setReports] = useState();
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const formatDate = (dateString) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  };
  const [dateInput, setDateInput] = useState();
  const [itemCount, setItemCount] = useState(3);
  const [selectedReport, setSelectedReport] = useState();
  const [dateError, setDateError] = useState();

  const { data: veterinaryReports } = useQuery({
    queryKey: ["veterinaryReports", dateInput, itemCount],
    queryFn: () => animalsApi.getVeterinaryReportsByDate(dateInput, itemCount),
    enabled: !!dateInput,
  });
  const handleReportClick = (report) => {
    if (selectedReport && selectedReport.id === report.id) {
      setSelectedReport(null);
    } else {
      setSelectedReport(report);
    }
  };
  const checkData = () => {
    setDateError("");
    if (dateInput > getTodayDate()) {
      setDateError(
        "La date ne peut pas être ultérieure à celle d'aujourd'hui."
      );
    }
  };
  useEffect(() => {
    checkData();
  }, [dateInput]);

  const getAnimalName = async (animalId) => {
    const animal = await animalsApi.getAnimal(animalId);
    return animal ? animal.firstName : "";
  };
  useEffect(() => {
    const getReportsWithAnimalName = async () => {
      if (veterinaryReports && veterinaryReports.reports) {
        const updatedReports = await Promise.all(
          veterinaryReports.reports.map(async (report) => {
            const name = await getAnimalName(report.animalId);
            return { ...report, animalName: name };
          })
        );
        setReports(updatedReports);
      }
    };

    getReportsWithAnimalName();
  }, [veterinaryReports]);
  useEffect(() => {
    if (reports && reports.length > 0) {
      console.log(reports);
    }
  }, [reports]);
  return (
    <>
      <form>
        <label htmlFor="dateInput" className="formLabel">
          Date des rapports à afficher
        </label>
        <input
          type="date"
          id="dateInput"
          className="formInput"
          onChange={(e) => setDateInput(e.target.value)}
        />
      </form>
      <div className="reportsContainer">
        {reports && reports.length > 1 ? (
          reports.map((report) => (
            <div className="reportPlaceholder" key={report.id}>
              <div
                className={
                  selectedReport && selectedReport.id === report.id
                    ? "reportNavLinkActive"
                    : "reportNavLink"
                }
                onClick={() => handleReportClick(report)}
              >
                <p>Rapport vétérinaire sur {report && report.animalName}</p>
                {selectedReport && selectedReport.id === report.id && (
                  <div className="reportDetails">
                    <p>
                      <span>État de santé: </span>
                      {report.animalState}
                    </p>
                    {report.animalStateDetails && (
                      <p>
                        <span>Commentaire: </span>
                        {report.animalStateDetails}
                      </p>
                    )}

                    <p>
                      <span>Alimentation suggerée: </span>
                      {report.foodProvided}
                    </p>
                    <p>
                      <span>Quantité suggerée: </span>
                      {report.foodAmountGrams}g / jour
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : dateError ? (
          <p className="errorMessage">{dateError}</p>
        ) : (
          <p className="infoMessage">
            Aucun rapport à afficher pour cette date.
          </p>
        )}
        {veterinaryReports &&
          veterinaryReports.reports &&
          veterinaryReports.reports.length !== veterinaryReports.totalCount && (
            <CustomButton
              title="Voir plus de rapports"
              type="button"
              buttonClassName="mediumMobileButton"
              onClick={() => {
                veterinaryReports &&
                  veterinaryReports.reports.length !==
                    veterinaryReports.totalCount;
                setItemCount(itemCount + 10);
              }}
            />
          )}
      </div>
    </>
  );
};

export default ReportsByDate;
