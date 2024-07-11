import React from "react";
import { useMediaQuery } from "react-responsive";

const EcologyContent = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  return (
    <div id="ecologyContent" className="convictionContent">
      <h3>Eco-responsabilité</h3>
      <p>
        Comme beaucoup, nos équipes sont sensibles à la cause environnementale.
        Et nous ne pouvons plus nous permettre d’ignorer les recommandations
        scientifiques. Pour cela Arcadia s’est équipé et en a fait une fierté,
        le parc est désormais entièrement autonome au niveau de ses énergies.
      </p>
    </div>
  );
};

export default EcologyContent;
