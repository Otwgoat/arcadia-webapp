import React from "react";
import DashboardHeader from "../../components/dashboards/DashboardHeader";
import PrevLink from "../../components/dashboards/admin/PrevLink";
import ServicesList from "../../components/dashboards/admin/ServicesList";

const UpdateServicesDashboardPage = () => {
  return (
    <div className="container">
      <DashboardHeader />
      <div className="pageContainer dashboardContainer">
        <PrevLink link="/dashboard" title="Revenir au dashboard" />
        <div className="heroTitle">
          <h1>Services</h1>
          <h3>Modifier les services</h3>
        </div>
        <ServicesList />
      </div>
    </div>
  );
};

export default UpdateServicesDashboardPage;
