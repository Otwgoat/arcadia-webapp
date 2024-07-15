import React from "react";
import DashboardHeader from "../../components/dashboards/DashboardHeader";
import PrevLink from "../../components/dashboards/admin/PrevLink";
import ServicesList from "../../components/dashboards/admin/ServicesList";
import CustomButton from "../../components/CustomButton";
import { useMediaQuery } from "react-responsive";

const UpdateServicesDashboardPage = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
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

export default UpdateServicesDashboardPage;
