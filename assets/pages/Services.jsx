import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useQuery } from "@tanstack/react-query";
import servicesApi from "../services/servicesApi";
import PrevLink from "../components/dashboards/admin/PrevLink";
import Footer from "../components/Footer";
import { useMediaQuery } from "react-responsive";
import { Helmet } from "react-helmet-async";

const Services = () => {
  const [loadingError, setLoadingError] = useState();
  const [cardActive, setCardActive] = useState();
  const { data: services, isError } = useQuery({
    queryKey: ["services"],
    queryFn: servicesApi.getServices,
  });
  if (isError) {
    return setLoadingError("Erreur lors du chargement des services");
  }
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  useEffect(() => {
    console.log(services);
  }, [services]);
  return (
    <>
      <Helmet>
        <title>Arcadia Zoo - Nos services</title>
        <meta
          name="description"
          content="Découvrez les services proposés par Arcadia Zoo. Lors de votre visite au parc, profitez de nos services pour une expérience inoubliable."
        />
      </Helmet>
      <div className="container" id="servicesPage">
        <Header pageActive="services" />
        <div className="pageContainer" id="serviceContainer">
          {isDesktop ? null : <PrevLink link="/" title="Revenir à l'accueil" />}
          <div className="heroTitle">
            <h1>Nos services</h1>
            <h3>Découvrez nos services</h3>
          </div>
          <div className="servicesContainer">
            {loadingError && <p>{loadingError}</p>}
            {services &&
              services.map((service) => (
                <div
                  key={service.id}
                  className={
                    cardActive === service.id
                      ? "serviceCardActive"
                      : "serviceCard"
                  }
                >
                  <h3>{service.title}</h3>
                  <p className="serviceDescription">{service.description}</p>
                  {isDesktop && cardActive !== service.id ? (
                    <p
                      className="seeMoreP"
                      onClick={() => setCardActive(service.id)}
                    >
                      Lire la suite
                    </p>
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

export default Services;
