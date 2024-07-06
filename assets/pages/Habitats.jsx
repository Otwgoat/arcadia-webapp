import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import PrevLink from "../components/dashboards/admin/PrevLink";
import { useQuery } from "@tanstack/react-query";
import habitatsApi from "../services/habitatsApi";
import { getFiles } from "../services/firebase";
import CustomButton from "../components/CustomButton";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
const Habitats = () => {
  const navigate = useNavigate();
  const [loadingError, setLoadingError] = useState();
  const [updatedHabitats, setUpdatedHabitats] = useState();
  const { data: habitats, isError } = useQuery({
    queryKey: ["habitats"],
    queryFn: habitatsApi.getHabitats,
  });
  if (isError) {
    return setLoadingError("Erreur lors du chargement des habitats");
  }
  const getPrincipalImage = async (habitatId) => {
    try {
      const images = await getFiles("habitats/" + habitatId);
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
  useEffect(() => {
    setUpdatedHabitats(habitats);
  }, [habitats]);
  useEffect(() => {
    const loadImages = async () => {
      if (habitats) {
        const newHabitats = await Promise.all(
          habitats.map(async (habitat) => {
            const imageUrl = await getPrincipalImage(habitat.id);
            return { ...habitat, imageUrl };
          })
        );
        setUpdatedHabitats(newHabitats);
      }
    };
    loadImages();
  }, [habitats]);
  const handleNavigate = (habitat) => {
    navigate(`/habitats/${habitat.id}`, { state: { habitat: habitat } });
  };
  return (
    <div className="container">
      <Header />
      <div className="pageContainer">
        <PrevLink link="/" title="Revenir à l'accueil" />
        <div className="heroTitle">
          <h1>Nos habitats</h1>
          <h3>Découvrez nos habitats et leurs résidents.</h3>
        </div>
        <div className="habitatsContainer">
          {updatedHabitats &&
            updatedHabitats.map((habitat) => (
              <div key={habitat.id} className="habitatCard">
                <img src={habitat.imageUrl} alt="Image de l'habitat" />
                <div className="habitatCardHeader">
                  <h3>{habitat.name}</h3>
                  <p>{habitat.description}</p>
                </div>

                <CustomButton
                  title="Découvrir les résidents"
                  buttonClassName="mediumMobileButton"
                  onClick={() => {
                    handleNavigate(habitat);
                  }}
                />
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Habitats;
