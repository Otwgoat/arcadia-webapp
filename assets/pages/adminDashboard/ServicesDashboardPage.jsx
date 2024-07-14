import React, { useState } from "react";
import DashboardHeader from "../../components/dashboards/DashboardHeader";
import DashboardNavItem from "../../components/dashboards/DashboardNavItem";
import CreateServiceForm from "../../components/dashboards/admin/CreateServiceForm";
import ServicesList from "../../components/dashboards/admin/ServicesList";
import PlanningUpdateForm from "../../components/dashboards/admin/PlanningUpdateForm";
import PrevLink from "../../components/dashboards/admin/PrevLink";
import { useMediaQuery } from "react-responsive";
import CustomButton from "../../components/CustomButton";

const ServicesDashboardPage = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const [createServiceFormOpen, setCreateServiceFormOpen] = useState(false);
  const [servicesListOpen, setServicesListOpen] = useState(false);
  const [planningFormOpen, setPlanningFormOpen] = useState(false);
  const [isActive, setIsActive] = useState("");
  return (
    <div className="container">
      <DashboardHeader />
      <div
        className="pageContainer dashboardContainer"
        id="serviceDashboardPage"
      >
        <PrevLink link="/dashboard" title="Revenir au dashboard" />
        <div className="heroTitle">
          <h1>Services</h1>
          <h3>Gestion des services et horaires</h3>
        </div>
        <div className="dashboardNav">
          <DashboardNavItem
            title={
              isActive === "serviceForm"
                ? "Annuler la création"
                : "Créer un service"
            }
            dashboardNavItemClassName={
              isActive === "serviceForm"
                ? "dashboardNavItem active"
                : "dashboardNavItem"
            }
            onClick={() =>
              isActive !== "serviceForm"
                ? setIsActive("serviceForm")
                : setIsActive("")
            }
          />
          {isActive === "serviceForm" && !isDesktop ? (
            <CreateServiceForm
              isUpdate={false}
              successMessage="Service créé avec succès"
              formMethod="POST"
              submitButtonTitle="Créer le service"
            />
          ) : null}
          <DashboardNavItem
            title={
              isActive === "serviceList"
                ? "Fermer la liste"
                : "Liste des services"
            }
            dashboardNavItemClassName={
              isActive === "serviceList"
                ? "dashboardNavItem active"
                : "dashboardNavItem"
            }
            onClick={() =>
              isActive !== "serviceList"
                ? setIsActive("serviceList")
                : setIsActive("")
            }
          />
          {isActive === "serviceList" && !isDesktop ? <ServicesList /> : null}
          <DashboardNavItem
            title={
              isActive === "planningForm"
                ? "Fermer le planning"
                : "Modifier les horaires du parc"
            }
            dashboardNavItemClassName={
              isActive === "planningForm"
                ? "dashboardNavItem active"
                : "dashboardNavItem"
            }
            onClick={() =>
              isActive !== "planningForm"
                ? setIsActive("planningForm")
                : setIsActive("")
            }
          />
          {isActive === "serviceForm" && isDesktop ? (
            <CreateServiceForm
              isUpdate={false}
              successMessage="Service créé avec succès"
              formMethod="POST"
              submitButtonTitle="Créer le service"
            />
          ) : null}
          {isActive === "serviceList" && isDesktop ? <ServicesList /> : null}
          {isActive === "planningForm" ? <PlanningUpdateForm /> : null}
        </div>
        {isDesktop && (
          <CustomButton
            id="prevButton"
            buttonClassName="mediumDesktopButton"
            title="Revenir au dashboard"
            path="/dashboard"
          />
        )}
      </div>
    </div>
  );
};

export default ServicesDashboardPage;
