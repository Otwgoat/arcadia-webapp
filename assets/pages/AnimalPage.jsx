import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import animalsApi from "../services/animalsApi";
import { useQuery } from "@tanstack/react-query";
import { getFiles } from "../services/firebase";
import ImageSliderMobile from "../components/ImageSliderMobile";
import Footer from "../components/Footer";
import CustomButton from "../components/CustomButton";

const AnimalPage = () => {
  const formatDate = (dateString) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  };
  const { habitatName: paramHabitatName } = useParams();
  const { animalId: paramAnimalId } = useParams();
  const [animalId, setAnimalId] = useState(
    paramAnimalId.includes(":") ? paramAnimalId.split(":")[1] : paramAnimalId
  );
  const [habitatName, setHabitatName] = useState(
    paramHabitatName.includes(":")
      ? paramHabitatName.split(":")[1]
      : paramHabitatName
  );
  const { data: animal } = useQuery({
    queryKey: ["animal", animalId],
    queryFn: () => animalsApi.getAnimal(animalId),
  });

  const { data: animalImages } = useQuery({
    queryKey: ["animalImages", animalId],
    queryFn: () => getFiles("animals/" + animalId),
    enabled: !!animalId,
  });

  useEffect(() => {
    if (animal) {
      console.log(animal);
    }
  }, [animal]);
  useEffect(() => {
    if (animalImages) {
      console.log(animalImages);
    }
  }, [animalImages]);
  return (
    <div className="container">
      <Header />
      <div id="animalPageContainer">
        <ImageSliderMobile images={animalImages} />
        <h1>{animal?.firstName}</h1>
        <div id="animalInfosCard">
          <div className="animalInfoItem">
            <p className="animalInfotitle">Espèce</p>
            <span className="line"></span>
            <p>{animal?.race}</p>
          </div>
          <div className="animalInfoItem">
            <p className="animalInfotitle">Genre</p>
            <span className="line"></span>
            <p>{animal?.gender === "male" ? "Mâle" : "Femelle"}</p>
          </div>
          <div className="animalInfoItem">
            <p className="animalInfotitle">Naissance</p>
            <span className="line"></span>
            <p>{formatDate(animal?.birthDate)}</p>
          </div>
          <div className="animalInfoItem">
            <p className="animalInfotitle">Habitat</p>
            <span className="line"></span>
            <p>{habitatName}</p>
          </div>
        </div>
        <div className="animalContentCard" id="animalDescriptionCard">
          <h2>Description</h2>
          <p>{animal?.description}</p>
        </div>
        <div className="animalContentCard" id="animalVeterinaryReportCard">
          <h2>Rapport vétérinaire</h2>
          <p className="veterinaryReportItem">
            <span className="reportItemTitle">État de santé: </span>{" "}
            {animal?.lastVeterinaryReport?.animalState}
          </p>
          {animal?.lastVeterinaryReport?.animalStateDetails !== "" && (
            <p className="veterinaryReportItem">
              <span className="reportItemTitle">Détails: </span>
              {animal?.lastVeterinaryReport?.animalStateDetails}
            </p>
          )}

          <p className="veterinaryReportItem">
            <span className="reportItemTitle">Date du rapport: </span>
            {formatDate(animal?.lastVeterinaryReport?.date)}
          </p>
          <p className="veterinaryReportItem">
            <span className="reportItemTitle">Nourriture proposée: </span>
            {animal?.lastVeterinaryReport?.foodProvided}
          </p>
          <p className="veterinaryReportItem">
            <span className="reportItemTitle">Quantité proposée: </span>
            {animal?.lastVeterinaryReport?.foodAmountGrams}g / jour
          </p>
        </div>
        <CustomButton
          title="Retour à l'habitat"
          buttonClassName="mediumMobileButton"
          path={`/habitats/${animal?.habitatId.id}`}
        />
      </div>

      <Footer />
    </div>
  );
};

export default AnimalPage;
