import React, { useEffect, useState } from "react";
import SelectAnimal from "../SelectAnimal";
import { useQuery } from "@tanstack/react-query";
import animalsApi from "../../../services/animalsApi";
import CustomButton from "../../CustomButton";
import { useMediaQuery } from "react-responsive";

const ReportsByAnimal = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 700px)" });
  const [isSorted, setIsSorted] = useState(false);
  /**
   * Formats the date to a french format.
   * @param {*} dateString
   * @returns
   */
  const formatDate = (dateString) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  };
  const [animalId, setAnimalId] = useState();
  const [displayReports, setDisplayReports] = useState(false);
  const [itemCount, setItemCount] = useState(3);
  const [selectedReport, setSelectedReport] = useState();
  const [reports, setReports] = useState();
  const selectAnimalOnChange = (value) => {
    setDisplayReports(true);
    setAnimalId(value);
    if (value === "") {
      setDisplayReports(false);
    }
  };
  const { data: veterinaryReports } = useQuery({
    queryKey: ["veterinaryReports", animalId, itemCount],
    queryFn: () => animalsApi.getVeterinaryReports(animalId, itemCount),
  });
  /**
   * Select and show a specific report when clicked.
   * @param {*} report
   */
  const handleReportClick = (report) => {
    if (selectedReport && selectedReport.id === report.id) {
      setSelectedReport(null);
    } else {
      setSelectedReport(report);
    }
  };
  useEffect(() => {
    if (veterinaryReports && veterinaryReports.reports) {
      setReports(veterinaryReports.reports);
    }
  }, [veterinaryReports]);

  /**
   * Sorts the reports based on their date and returns the sorted array.
   */
  const sortReports = (reports, ascending) => {
    return reports
      .slice()
      .sort((a, b) =>
        ascending
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date)
      );
  };

  useEffect(() => {
    if (reports && reports.length > 0) {
      setReports((prevReports) => sortReports(prevReports, isSorted));
    }
  }, [isSorted]);

  return (
    <>
      <form>
        <SelectAnimal selectAnimalOnChange={selectAnimalOnChange} />
      </form>
      {displayReports && (
        <div className="reportsContainer">
          <p onClick={() => setIsSorted(!isSorted)} className="infoMessage">
            {isSorted
              ? "Trier par les plus récents"
              : "Trier par les moins récents"}
          </p>
          {reports && reports && reports.length > 1 ? (
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
                  <p>
                    Rapport vétérinaire du{" "}
                    <span className="reportDate">
                      {formatDate(report.date)}
                    </span>
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
          ) : (
            <p className="infoMessage">Aucun rapport vétérinaire disponible</p>
          )}
          {veterinaryReports &&
            veterinaryReports.reports.length !==
              veterinaryReports.totalCount && (
              <CustomButton
                title="Voir plus de rapports"
                type="button"
                buttonClassName={
                  isDesktop ? "smallDesktopButton" : "smallMobileButton"
                }
                onClick={() => {
                  veterinaryReports &&
                    veterinaryReports.reports.length !==
                      veterinaryReports.totalCount;
                  setItemCount(itemCount + 3), setIsSorted(false);
                }}
              />
            )}
        </div>
      )}
    </>
  );
};

export default ReportsByAnimal;
