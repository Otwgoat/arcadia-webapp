import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import PrevLink from "../components/dashboards/admin/PrevLink";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import habitatsApi from "../services/habitatsApi";
import { useQuery } from "@tanstack/react-query";
import { getFiles, incrementAnimalViews } from "../services/firebase";
import { ArrowSquareIn } from "@phosphor-icons/react";
import CustomButton from "../components/CustomButton";
import Footer from "../components/Footer";
import ImageSliderMobile from "../components/ImageSliderMobile";

const HabitatPage = () => {
  const navigate = useNavigate();
  const [displayHabitatImage, setDisplayHabitatImage] = useState(0);
  const [filteredAnimalsTotalCount, setFilteredAnimalsTotalCount] = useState(0);
  const getPrincipalImage = async (folder, itemId) => {
    try {
      const images = await getFiles(`/${folder}/${itemId}`);
      if (images && images.length > 0) {
        const principalImage = images.find(
          (image) => image.isPrincipal === true
        );
        return principalImage ? principalImage.url : images[0].url;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [species, setSpecies] = useState([]);
  const [specyDisplayed, setSpecyDisplayed] = useState("");
  const [displayedAnimals, setDisplayedAnimals] = useState([]);
  const [displayAnimalsError, setDisplayAnimalsError] = useState();
  const [itemCount, setItemCount] = useState(3);
  const location = useLocation();
  const { id: paramHabitatId } = useParams();
  const [habitatId, setHabitatId] = useState(
    paramHabitatId.includes(":") ? paramHabitatId.split(":")[1] : paramHabitatId
  );
  const { data: habitat } = useQuery({
    queryKey: ["habitat", habitatId],
    queryFn: () => habitatsApi.getHabitat(habitatId),
    enabled: !!habitatId,
  });

  const { data: habitatImages } = useQuery({
    queryKey: ["habitatImages", habitatId],
    queryFn: () => getFiles("habitats/" + habitatId),
    enabled: !!habitatId,
  });
  useEffect(() => {
    console.log(habitatImages);
  }, [habitatImages]);

  const { data: animals } = useQuery({
    queryKey: ["animals", habitatId],
    queryFn: () => habitatsApi.getAnimals(habitatId),
    enabled: !!habitatId,
  });
  const getUniqueSpecies = (animals) => {
    const differentSpecies = [];
    animals &&
      animals.map((animal) => {
        if (!differentSpecies.includes(animal.race)) {
          differentSpecies.push(animal.race);
        }
      });
    setSpecies(differentSpecies);
  };

  useEffect(() => {
    const loadDisplayedAnimals = async () => {
      if (animals && animals.length > 0) {
        let filteredAnimals =
          specyDisplayed === ""
            ? animals
            : animals.filter((animal) => animal.race === specyDisplayed);

        setFilteredAnimalsTotalCount(filteredAnimals.length);
        const newFilteredAnimals = filteredAnimals.slice(0, itemCount);
        const newDisplayedAnimals = await Promise.all(
          newFilteredAnimals.map(async (animal) => {
            const imageUrl = await getPrincipalImage("animals", animal.id);
            return { ...animal, imageUrl };
          })
        );

        setDisplayedAnimals(newDisplayedAnimals);
      } else {
        setDisplayAnimalsError("Chargement des animaux...");
      }
    };

    loadDisplayedAnimals();
  }, [animals, specyDisplayed, itemCount]);

  const handleAnimalClick = (animalId) => {
    try {
      incrementAnimalViews(animalId).then(() => {
        navigate(`/habitats/animal/${animalId}`);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUniqueSpecies(animals);
  }, [animals]);

  useEffect(() => {
    if (filteredAnimalsTotalCount) {
      console.log(filteredAnimalsTotalCount);
    }
  }, [filteredAnimalsTotalCount]);
  useEffect(() => {
    if (habitatImages) {
      console.log(habitatImages[displayHabitatImage]);
    }
  }, [displayHabitatImage]);
  return (
    <div className="container">
      <Header />
      <div id="habitatPageContainer">
        <ImageSliderMobile images={habitatImages && habitatImages} />

        <h1>{habitat && habitat.name}</h1>
        <p className="subh1">{habitat && habitat.description}</p>
        <form>
          <select
            className="formInput selectInput"
            onChange={(e) => setSpecyDisplayed(e.target.value)}
          >
            <option value="">Filtrer par espèce</option>
            {species &&
              species.length > 0 &&
              species.map((specy) => (
                <option key={specy} value={specy}>
                  {specy}
                </option>
              ))}
          </select>
        </form>
        <div id="animalsContainer">
          {displayedAnimals && displayedAnimals.length > 0 ? (
            displayedAnimals.map((animal) => (
              <Link
                key={animal.id}
                className="animalCard"
                onClick={() => handleAnimalClick(animal.id)}
              >
                <img
                  src={animal.imageUrl}
                  alt={`Image de ${animal.firstName}`}
                />
                <div className="animalCardLink">
                  <h3>
                    {animal.firstName} - {animal.race}
                  </h3>
                  <span>
                    <ArrowSquareIn size={20} color="#fdf5e9" weight="regular" />
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <p className="infoMessage">{displayAnimalsError}</p>
          )}
          {displayedAnimals &&
          displayedAnimals.length > 0 &&
          filteredAnimalsTotalCount &&
          itemCount < filteredAnimalsTotalCount ? (
            <CustomButton
              title="En voir plus"
              buttonClassName="mediumMobileButton"
              onClick={() =>
                itemCount < filteredAnimalsTotalCount &&
                setItemCount(itemCount + 3)
              }
            />
          ) : null}
          <CustomButton
            title="Retour à la liste des habitats"
            buttonClassName="mediumMobileButton"
            path="/habitats"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HabitatPage;
