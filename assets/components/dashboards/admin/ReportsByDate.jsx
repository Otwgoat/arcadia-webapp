import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import animalsApi from "../../../services/animalsApi";
import CustomButton from "../../CustomButton";
import { da } from "@faker-js/faker";

const ReportsByDate = () => {
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
        {veterinaryReports &&
        veterinaryReports.reports &&
        veterinaryReports.reports.length > 1 ? (
          veterinaryReports.reports.map((report) => (
            <div className="reportPlaceholder" key={report.id}>
              <div
                className={
                  selectedReport && selectedReport.id === report.id
                    ? "reportNavLinkActive"
                    : "reportNavLink"
                }
                onClick={() => handleReportClick(report)}
              >
                <p>
                  Rapport vétérinaire du{" "}
                  <span className="reportDate">{formatDate(report.date)}</span>
                </p>
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
