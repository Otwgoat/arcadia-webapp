import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import PrevLink from "../components/dashboards/admin/PrevLink";
import { useQuery } from "@tanstack/react-query";
import habitatsApi from "../services/habitatsApi";
import { getFiles } from "../services/firebase";
import CustomButton from "../components/CustomButton";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { ArrowSquareIn } from "@phosphor-icons/react";
import { Helmet } from "react-helmet-async";
const Habitats = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
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
    /**
     * Loads images for habitats.
     * @returns {Promise<void>} A promise that resolves when the images are loaded.
     */
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
    <>
      <Helmet>
        <title>Arcadia Zoo - Nos habitats</title>
        <meta
          name="description"
          content="Découvrez les habitats de nos animaux. Nous avons à coeur de représenter au maximum l'habitat naturel de chaque résident, pour que ce parc se mue en un véritable sanctuaire."
        />
      </Helmet>
      <div className="container">
        <Header pageActive="habitats" />
        <div className="pageContainer">
          {isDesktop ? null : <PrevLink link="/" title="Revenir à l'accueil" />}
          <div className="heroTitle">
            <h1>Nos habitats</h1>
            <h3>Découvrez nos habitats et leurs résidents.</h3>
          </div>
          <div className="habitatsContainer">
            {updatedHabitats &&
              updatedHabitats.map((habitat) => (
                <div key={habitat.id} className="habitatCard">
                  <img src={habitat.imageUrl} alt="Image de l'habitat" />
                  {isDesktop ? null : (
                    <div className="habitatCardHeader">
                      <h3>{habitat.name}</h3>
                      <p>{habitat.description}</p>
                    </div>
                  )}
                  {!isDesktop ? (
                    <CustomButton
                      title="Découvrir les résidents"
                      buttonClassName="mediumMobileButton"
                      onClick={() => {
                        handleNavigate(habitat);
                      }}
                    />
                  ) : null}
                  {isDesktop ? (
                    <div className="cardLink">
                      <Link to={`/habitats/${habitat.id}`}>
                        {habitat.name}{" "}
                        <span>
                          {
                            <ArrowSquareIn
                              size={20}
                              color="#fdf5e9"
                              weight="regular"
                            />
                          }
                        </span>
                      </Link>
                    </div>
                  ) : null}
                </div>
              ))}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Habitats;
