import React, { useState } from "react";

import CustomButton from "../components/CustomButton";
import Header from "../components/Header";
import {
  ArrowSquareIn,
  BookOpen,
  HandHeart,
  Leaf,
} from "@phosphor-icons/react";
import HappinessContent from "../components/content/HappinessContent";
import EcologyContent from "../components/content/EcologyContent";
import PedagogyContent from "../components/content/PedagogyContent";
import ParkIntroductionCard from "../components/content/ParkIntroductionCard";
import Reviews from "../components/content/Reviews";
import PostReviewForm from "../components/forms/PostReviewForm";
import Footer from "../components/Footer";
import HomeSlider from "../components/content/HomeSlider";
import { useMediaQuery } from "react-responsive";
import { Helmet } from "react-helmet-async";

export const Home = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const [activeContent, setActiveContent] = useState("happiness");
  const [introText, setIntroText] = useState(
    "Bienvenue sur le site du parc zoologique Arcadia. Situé à quelques kilomètres de Brocéliande, ce sanctuaire enchanteur offre une escapade fascinante à travers des habitats naturels diversifiés où cohabitent des espèces rares et exotiques. Venez découvrir une expérience unique où la nature se mêle à la magie, invitant petits et grands à explorer, apprendre et s'émerveiller."
  );

  const handleActive = (content) => {
    setActiveContent(content);
  };
  return (
    <>
      <Helmet>
        <title>Arcadia Zoo - Accueil</title>
        <meta
          name="description"
          content="Bienvenue sur le site du zoo Arcadia. Situé aux alentours de Brocéliande en Bretagne, nous sommes heureux de vous faire découvrir le monde animal à travers des habitats naturels diversifiés où cohabitent des espèces rares et exotiques."
        />
      </Helmet>
      <div className="container">
        <Header pageActive="home" />
        <main className="pageContainer">
          <HomeSlider />
          {!isDesktop ? (
            <>
              <h1>Arcadia</h1>
              <p id="introText" className="subh1">
                {introText}
              </p>
              <CustomButton
                buttonClassName="largeMobileButton"
                title="Découvrir le parc"
                path={"/habitats"}
              />
            </>
          ) : (
            <div id="homeHeroBanner">
              <h1>Arcadia</h1>
              <div id="homeHeroBannerContent">
                <div className="imgPlaceholder"></div>
                <div id="heroBannerDescription">
                  <p id="introText" className="subh1">
                    {introText}
                  </p>
                  <CustomButton
                    buttonClassName="mediumDesktopButton"
                    title="Découvrir le parc"
                    path={"/habitats"}
                  />
                </div>
              </div>
            </div>
          )}
          {!isDesktop ? (
            <div id="convictionSection">
              <h2>Nos Convictions</h2>
              <p className="subh1">
                Notre équipe aime ses animaux et le monde dans lequel nous
                vivons. Elle a aussi des valeurs à protéger. Tout au long de
                votre visite, nous avons à coeur de vous les transmettre.
              </p>
              <div id="iconsBar">
                <span
                  onClick={() => handleActive("happiness")}
                  className={activeContent === "happiness" ? "active" : ""}
                >
                  <HandHeart
                    size={32}
                    color={
                      activeContent === "happiness" ? "#fdf5e9" : "#FDF5E966"
                    }
                  />
                </span>
                <span
                  onClick={() => handleActive("ecology")}
                  className={activeContent === "ecology" ? "active" : ""}
                >
                  <Leaf
                    size={32}
                    color={
                      activeContent === "ecology" ? "#fdf5e9" : "#FDF5E966"
                    }
                  />
                </span>
                <span
                  onClick={() => handleActive("pedagogy")}
                  className={activeContent === "pedagogy" ? "active" : ""}
                >
                  <BookOpen
                    size={32}
                    color={
                      activeContent === "pedagogy" ? "#fdf5e9" : "#FDF5E966"
                    }
                  />
                </span>
              </div>
              {activeContent === "happiness" && <HappinessContent />}
              {activeContent === "ecology" && <EcologyContent />}
              {activeContent === "pedagogy" && <PedagogyContent />}
            </div>
          ) : (
            <div id="convictionsSection">
              <div id="convictionSection" className="convictionCard">
                <div className="convictionContent">
                  <h2>Nos Convictions</h2>
                  <p className="subh1-light">
                    Notre équipe aime ses animaux et le monde dans lequel nous
                    vivons. Elle a aussi des valeurs à protéger. Tout au long de
                    votre visite, nous avons à coeur de vous les transmettre.
                  </p>
                </div>
              </div>
              <div
                id="happinessCard"
                className={
                  activeContent === "happiness"
                    ? "convictionCardActive"
                    : "convictionCard"
                }
                onClick={() => handleActive("happiness")}
              >
                {activeContent === "happiness" ? (
                  <HappinessContent />
                ) : (
                  <>
                    <p className="convictionCardLink">
                      Bien-être animal{" "}
                      <span>
                        <ArrowSquareIn
                          weight="regular"
                          size={20}
                          color="#fdf5e9"
                        />
                      </span>
                    </p>
                  </>
                )}
              </div>
              <div
                id="ecologyCard"
                className={
                  activeContent === "ecology"
                    ? "convictionCardActive"
                    : "convictionCard"
                }
                onClick={() => handleActive("ecology")}
              >
                {activeContent === "ecology" ? (
                  <EcologyContent />
                ) : (
                  <>
                    {" "}
                    <p className="convictionCardLink">
                      Eco-responsabilité{" "}
                      <span>
                        <ArrowSquareIn
                          weight="regular"
                          size={20}
                          color="#fdf5e9"
                        />
                      </span>
                    </p>
                  </>
                )}
              </div>
              <div
                id="pedagogyCard"
                className={
                  activeContent === "pedagogy"
                    ? "convictionCardActive"
                    : "convictionCard"
                }
                onClick={() => handleActive("pedagogy")}
              >
                {activeContent === "pedagogy" ? (
                  <PedagogyContent />
                ) : (
                  <>
                    {" "}
                    <p className="convictionCardLink">
                      Pédagogie{" "}
                      <span>
                        <ArrowSquareIn
                          weight="regular"
                          size={20}
                          color="#fdf5e9"
                        />
                      </span>
                    </p>
                  </>
                )}
              </div>
            </div>
          )}

          <div id="parkIntroduction">
            <h2>Notre parc</h2>
            <p className="subh1">
              Pour les plus aventureux, nous avons pensé à tout. Découvrez les
              services qui rendront votre visite à travers nos habitats,
              inoubliable.
            </p>
            <div className="parkIntroductionCards">
              <ParkIntroductionCard
                id="restaurantCard"
                title="Le restaurant"
                content="Pour ne pas explorer le ventre vide, découvrez chaque jour un plat
          proposé par note chef cuisinier , à base de produits locaux..."
                buttonPath="/services"
                buttonTitle="Découvrir nos services"
                mediaQuery={isDesktop}
              />
              <ParkIntroductionCard
                id="habitatCard"
                title="Les habitats"
                content="Appréciez la beauté et la diversité de nos résidents, en vous promenant à travers nos allées serpentants au cœur d'habitats soigneusement conçus pour refléter au mieux l'écosystème naturel de chaque espèce."
                buttonPath="/habitats"
                buttonTitle="Découvrir les habitats"
                mediaQuery={isDesktop}
              />
            </div>
          </div>
          <div id="reviewsContainer">
            <h2>Les avis</h2>
            <p id="reviewsSubtitle" className="subh1">
              Qu’en pense nos visiteurs ?
            </p>
            <Reviews mediaQuery={isDesktop} />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Home;
