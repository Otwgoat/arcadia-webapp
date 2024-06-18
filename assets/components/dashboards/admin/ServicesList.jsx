import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import servicesApi from "../../../services/servicesApi";
import { ArrowClockwise, XCircle } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import CreateServiceForm from "./CreateServiceForm";

const ServicesList = () => {
  const [updateServiceFormOpen, setUpdateServiceFormOpen] = useState(null);
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
    } catch (error) {
      console.error("Error in deleteService API call:", error);
      throw error;
    }
  };
  return (
    <div className="listContainer">
      {services &&
        services.map((service) => (
          <div key={service.id} className="listItem">
            <div className="listItemContent">
              <h3>{service.title}</h3>
              <div className="listItemActions">
                <ArrowClockwise
                  size={20}
                  weight="regular"
                  color="#fdf5e9"
                  onClick={() =>
                    updateServiceFormOpen === service.id
                      ? setUpdateServiceFormOpen(null)
                      : setUpdateServiceFormOpen(service.id)
                  }
                />
                <XCircle
                  size={20}
                  weight="regular"
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
