import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import servicesApi from "../../../services/servicesApi";
import { ArrowClockwise, XCircle } from "@phosphor-icons/react";
import CreateServiceForm from "./CreateServiceForm";
import { useMediaQuery } from "react-responsive";

const ServicesList = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const [updateServiceFormOpen, setUpdateServiceFormOpen] = useState(null);
  const [servicesList, setServicesList] = useState();
  const {
    data: services,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["services"],
    queryFn: servicesApi.getServices,
  });
  if (isLoading) {
    console.log(isLoading);
  }
  if (error) {
    return <p>Une erreur est survenue, merci de réesayer ou de patienter.</p>;
  }
  const handleDelete = async (serviceId) => {
    try {
      await servicesApi.deleteService(serviceId);
      setServicesList(
        servicesList.filter((service) => service.id !== serviceId)
      );
    } catch (error) {
      console.error("Error in deleteService API call:", error);
      throw error;
    }
  };
  useEffect(() => {
    setServicesList(services);
  }, [services]);
  return (
    <div className="listContainer">
      {isDesktop && <p className="subh1">Liste des services</p>}
      {servicesList &&
        servicesList.map((service, index) => (
          <div key={service.id} className="listItem">
            <div
              className={`listItemContent ${index % 2 === 0 ? "even" : "odd"}`}
            >
              {isDesktop ? (
                <p className="subh1">{service.title}</p>
              ) : (
                <h3>{service.title}</h3>
              )}
              <div className="listItemActions">
                <ArrowClockwise
                  size={20}
                  weight="light"
                  color="#fdf5e9"
                  onClick={() =>
                    updateServiceFormOpen === service.id
                      ? setUpdateServiceFormOpen(null)
                      : setUpdateServiceFormOpen(service.id)
                  }
                />
                <XCircle
                  style={{ marginLeft: "10px" }}
                  size={20}
                  weight="light"
                  color="#cf322a"
                  onClick={() => handleDelete(service.id)}
                />
              </div>
            </div>
            {updateServiceFormOpen === service.id && (
              <CreateServiceForm
                isUpdate={true}
                serviceId={service.id}
                formMethod="PUT"
                defaultServiceTitle={service.title}
                defaultServiceDescription={service.description}
                submitButtonTitle="Modifier le service"
              />
            )}
          </div>
        ))}
    </div>
  );
};

export default ServicesList;
