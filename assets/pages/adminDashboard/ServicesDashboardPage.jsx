import React, { useState } from "react";
import DashboardHeader from "../../components/dashboards/DashboardHeader";
import DashboardNavItem from "../../components/dashboards/DashboardNavItem";
import CreateServiceForm from "../../components/dashboards/admin/CreateServiceForm";
import ServicesList from "../../components/dashboards/admin/ServicesList";
import PlanningUpdateForm from "../../components/dashboards/admin/PlanningUpdateForm";
import PrevLink from "../../components/dashboards/admin/PrevLink";

const ServicesDashboardPage = () => {
  const [createServiceFormOpen, setCreateServiceFormOpen] = useState(false);
  const [servicesListOpen, setServicesListOpen] = useState(false);
  const [planningFormOpen, setPlanningFormOpen] = useState(false);
  return (
    <div className="container">
      <DashboardHeader />
      <div className="pageContainer dashboardContainer">
        <PrevLink link="/dashboard" title="Revenir au dashboard" />
        <div className="heroTitle">
          <h1>Services</h1>
          <h3>Gestion des services et horaires</h3>
        </div>
        <div className="dashboardNav">
          <DashboardNavItem
            title={
              createServiceFormOpen ? "Annuler la création" : "Créer un service"
            }
            dashboardNavItemClassName={
              createServiceFormOpen
                ? "dashboardNavItem active"
                : "dashboardNavItem"
            }
            onClick={() => setCreateServiceFormOpen(!createServiceFormOpen)}
          />
          {createServiceFormOpen ? (
            <CreateServiceForm
              isUpdate={false}
              successMessage="Service créé avec succès"
              formMethod="POST"
              submitButtonTitle="Créer le service"
            />
          ) : (
            ""
          )}
          <DashboardNavItem
            title={servicesListOpen ? "Fermer la liste" : "Liste des services"}
            dashboardNavItemClassName={
              servicesListOpen ? "dashboardNavItem active" : "dashboardNavItem"
            }
            onClick={() => setServicesListOpen(!servicesListOpen)}
          />
          {servicesListOpen ? <ServicesList /> : ""}
          <DashboardNavItem
            title={
              planningFormOpen
                ? "Fermer le planning"
                : "Modifier les horaires du parc"
            }
            dashboardNavItemClassName={
              planningFormOpen ? "dashboardNavItem active" : "dashboardNavItem"
            }
            onClick={() => setPlanningFormOpen(!planningFormOpen)}
          />
          {planningFormOpen ? <PlanningUpdateForm /> : null}
        </div>
      </div>
    </div>
  );
};

export default ServicesDashboardPage;
