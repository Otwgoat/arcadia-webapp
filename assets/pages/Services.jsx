import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useQuery } from "@tanstack/react-query";
import servicesApi from "../services/servicesApi";
import PrevLink from "../components/dashboards/admin/PrevLink";
import Footer from "../components/Footer";

const Services = () => {
  const [loadingError, setLoadingError] = useState();
  const { data: services, isError } = useQuery({
    queryKey: ["services"],
    queryFn: servicesApi.getServices,
  });
  if (isError) {
    return setLoadingError("Erreur lors du chargement des services");
  }
  useEffect(() => {
    console.log(services);
  }, [services]);
  return (
    <div className="container">
      <Header />
      <div className="pageContainer" id="serviceContainer">
        <PrevLink link="/" title="Revenir à l'accueil" />
        <div className="heroTitle">
          <h1>Nos services</h1>
          <h3>Découvrez nos services</h3>
        </div>
        <div className="servicesContainer">
          {loadingError && <p>{loadingError}</p>}
          {services &&
            services.map((service) => (
              <div key={service.id} className="serviceCard">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Services;
