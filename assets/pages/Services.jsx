import React, { useEffect } from "react";
import Header from "../components/Header";
import { useQuery } from "@tanstack/react-query";
import servicesApi from "../services/servicesApi";

const Services = () => {
  const { data: services, isError } = useQuery({
    queryKey: ["services"],
    queryFn: servicesApi.getServices,
  });
  useEffect(() => {
    console.log(services);
  }, [services]);
  return (
    <div className="container">
      <Header />
      <div className="pageContainer">
        <div className="heroContainer">
          <h1>Nos services</h1>
          <h3>Découvrez nos services</h3>
        </div>
      </div>
    </div>
  );
};

export default Services;
