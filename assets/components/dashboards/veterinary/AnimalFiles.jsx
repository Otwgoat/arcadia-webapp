import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import animalsApi from "../../../services/animalsApi";
import { getFiles } from "../../../services/firebase";
import CustomButton from "../../CustomButton";

/**
 * Renders a component that displays animal files, including veterinary reports and feeding reports.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.animalId - The ID of the animal.
 * @returns {JSX.Element} The rendered AnimalFiles component.
 */
const AnimalFiles = ({ animalId }) => {
  /**
   * Formats a date string into a localized date string.
   * @param {string} dateString - The date string to format.
   * @param {boolean} withHours - Whether to include hours and minutes in the formatted date string.
   * @returns {string} The formatted date string.
   */
  const formatDate = (dateString, withHours) => {
    if (!withHours) {
      const options = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      };
      return new Date(dateString).toLocaleDateString("fr-FR", options);
    } else {
      const options = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      return new Date(dateString).toLocaleDateString("fr-FR", options);
    }
  };
  const [displayedImage, setDisplayedImage] = useState();
  const [selectedReport, setSelectedReport] = useState(null);
  const [selectedFeedingReport, setSelectedFeedingReport] = useState(null);
  const [itemCount, setItemCount] = useState(3);
  const [feedingReportsItemCount, setFeedingReportsItemCount] = useState(3);

  const handleReportClick = (report) => {
    if (selectedReport && selectedReport.id === report.id) {
      setSelectedReport(null);
    } else {
      setSelectedReport(report);
    }
  };
  const handleFeedingReportClick = (report) => {
    if (selectedFeedingReport && selectedFeedingReport.id === report.id) {
      setSelectedFeedingReport(null);
    } else {
      setSelectedFeedingReport(report);
    }
  };

  const { data: veterinaryReports } = useQuery({
    queryKey: ["veterinaryReports", animalId, itemCount],
    queryFn: () => animalsApi.getVeterinaryReports(animalId, itemCount),
  });
  const { data: feedingReports } = useQuery({
    queryKey: ["feedingReports", animalId, feedingReportsItemCount],
    queryFn: () =>
      animalsApi.getFeedingReports(animalId, feedingReportsItemCount),
  });
  const { data: animal } = useQuery({
    queryKey: ["animal", animalId],
    queryFn: () => animalsApi.getAnimal(animalId),
    enabled: !!animalId,
  });

  const { data: images } = useQuery({
    queryKey: ["images", animalId],
    queryFn: () => getFiles("animals/" + animalId),
    enabled: !!animalId,
  });

  /**
   * Sets the displayed image to the principal image if it exists, or the first image in the images array.
   * @param {Object} report - The report to display.
   */
  useEffect(() => {
    if (images && images.length > 0) {
      const principalImage = images.find((image) => image.isPrincipal);
      if (principalImage) {
        setDisplayedImage(principalImage);
      } else {
        setDisplayedImage(images[0]);
      }
    }
  }, [images]);

  return (
    <div className="animalCardContainer">
      {!animal || !displayedImage ? (
        <p className="infoMessage">Chargement des données...</p>
      ) : (
        <>
          <img
            src={displayedImage?.url}
            alt={animal?.firstName}
            className="animalCardImg"
          />
          <div className="cardHeader">
            <h2>{animal?.firstName}</h2>
            <div className="animalCardInfos">
              <p className="subh1">
                <span>Espèce:</span> {animal?.race}
              </p>
              <p className="subh1">
                <span>Genre:</span>{" "}
                {animal?.gender && animal?.gender === "male"
                  ? "Mâle"
                  : "Femelle"}
              </p>
              <p className="subh1">
                <span>Date de naissance:</span>{" "}
                {formatDate(animal?.birthDate, false)}
              </p>
              <p className="subh1">
                <span>Habitat:</span> {animal?.habitatId.name}
              </p>
            </div>

            <div className="reportsContainer animalVeterinaryReportsContainer">
              <h2>Rapports précédents</h2>
              {veterinaryReports && veterinaryReports.reports.length > 0 ? (
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
                        <span className="reportDate">
                          {formatDate(report.date, false)}
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
                <p className="infoMessage">
                  Aucun rapport vétérinaire disponible
                </p>
              )}
              {veterinaryReports &&
                veterinaryReports.reports.length !==
                  veterinaryReports.totalCount && (
                  <CustomButton
                    title="Voir plus de rapports"
                    type="button"
                    buttonClassName="mediumMobileButton"
                    onClick={() => {
                      veterinaryReports &&
                        veterinaryReports.reports.length !==
                          veterinaryReports.totalCount;
                      setItemCount(itemCount + 3);
                    }}
                  />
                )}
            </div>
            <div className="reportsContainer animalFeedingReportsContainer">
              <h2>Rapports d'alimentation</h2>
              {feedingReports && feedingReports.reports.length > 0 ? (
                feedingReports.reports.map((report) => (
                  <div className="reportPlaceholder" key={report.id}>
                    <div
                      className={
                        selectedFeedingReport &&
                        selectedFeedingReport.id === report.id
                          ? "reportNavLinkActive"
                          : "reportNavLink"
                      }
                      onClick={() => handleFeedingReportClick(report)}
                    >
                      <p>
                        Rapport d'alimentation du{" "}
                        <span>{formatDate(report.date, true)}</span>{" "}
                      </p>
                      {selectedFeedingReport &&
                        selectedFeedingReport.id === report.id && (
                          <div className="reportDetails">
                            <p>
                              <span>Aliment: </span>
                              {report.foodType}
                            </p>
                            <p>
                              <span>Quantité: </span>
                              {report.foodAmountGrams}g
                            </p>
                          </div>
                        )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="infoMessage">
                  Aucun rapport d'alimentation disponible
                </p>
              )}
              {feedingReports &&
                feedingReports.reports.length !== feedingReports.totalCount && (
                  <CustomButton
                    title="Voir plus de rapport d'alimentation"
                    type="button"
                    buttonClassName="mediumMobileButton"
                    onClick={() => {
                      feedingReports &&
                        feedingReports.reports.length !==
                          feedingReports.totalCount;
                      setFeedingReportsItemCount(feedingReportsItemCount + 3);
                    }}
                  />
                )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AnimalFiles;
