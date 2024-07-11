import React from "react";
import { useMediaQuery } from "react-responsive";

const PedagogyContent = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  return (
    <div id="pedagogyContent" className="convictionContent">
      <h3>Pédagogie</h3>
      <p>
        La pédagogie est au cœur de notre mission. Nous croyons fermement que
        l'éducation est une puissante arme de conservation. À travers des
        programmes éducatifs innovants et interactifs, nous sensibilisons nos
        visiteurs à l'importance de la biodiversité et aux enjeux de la
        conservation des espèces. Nos animateurs passionnés partagent leurs
        connaissances avec enthousiasme, offrant des ateliers, des visites
        guidées et des présentations qui enrichissent l'expérience de chaque
        visiteur. En cultivant la curiosité et le respect pour le monde naturel,
        nous aspirons à inspirer une nouvelle génération de défenseurs de
        l'environnement.
      </p>
    </div>
  );
};

export default PedagogyContent;
