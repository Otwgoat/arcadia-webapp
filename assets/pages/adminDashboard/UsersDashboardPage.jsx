import React, { useState } from "react";
import DashboardHeader from "../../components/dashboards/DashboardHeader";
import DashboardNavItem from "../../components/dashboards/DashboardNavItem";
import CreateUserForm from "../../components/dashboards/admin/CreateUserForm";
import SearchUser from "../../components/dashboards/admin/SearchUser";
import PrevLink from "../../components/dashboards/admin/PrevLink";
import { useMediaQuery } from "react-responsive";
import CustomButton from "../../components/CustomButton";

const UsersDashboardPage = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const [isActive, setIsActive] = useState("");
  return (
    <div className="container">
      <DashboardHeader />
      <div className="pageContainer dashboardContainer">
        {isDesktop ? null : (
          <PrevLink link="/dashboard" title="Revenir au dashboard" />
        )}
        <div className="heroTitle">
          <h1>Utilisateurs</h1>
          <h3>Gestion des utilisateurs</h3>
        </div>
        <div className="dashboardNav">
          <DashboardNavItem
            title={
              isActive === "createForm"
                ? "Annuler la création"
                : "Créer un utilisateur"
            }
            dashboardNavItemClassName={
              isActive === "createForm"
                ? "dashboardNavItem active"
                : "dashboardNavItem"
            }
            onClick={() =>
              isActive !== "createForm"
                ? setIsActive("createForm")
                : setIsActive("")
            }
          />
          {isActive === "createForm" && !isDesktop ? <CreateUserForm /> : null}
          <DashboardNavItem
            title={
              isActive === "searchUsers"
                ? "Fermer la recherche"
                : "Rechercher un utilisateur"
            }
            dashboardNavItemClassName={
              isActive === "searchUsers"
                ? "dashboardNavItem active"
                : "dashboardNavItem"
            }
            onClick={() =>
              isActive !== "searchUsers"
                ? setIsActive("searchUsers")
                : setIsActive("")
            }
          />
          {isActive === "createForm" && isDesktop ? <CreateUserForm /> : null}
          {isActive === "searchUsers" ? <SearchUser /> : null}
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
export default UsersDashboardPage;
