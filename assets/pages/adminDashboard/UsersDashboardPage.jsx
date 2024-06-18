import React, { useState } from "react";
import DashboardHeader from "../../components/dashboards/DashboardHeader";
import DashboardNavItem from "../../components/dashboards/DashboardNavItem";
import CreateUserForm from "../../components/dashboards/admin/CreateUserForm";
import SearchUser from "../../components/dashboards/admin/SearchUser";
import PrevLink from "../../components/dashboards/admin/PrevLink";

const UsersDashboardPage = () => {
  const [createUserFormOpen, setCreateUserFormOpen] = useState(false);
  const [userSearchBarOpen, setUserSearchBarOpen] = useState(false);
  const handleOpenCreateUserForm = () => {
    setCreateUserFormOpen(!createUserFormOpen);
  };
  const handleOpenUserSearchBar = () => {
    setUserSearchBarOpen(!userSearchBarOpen);
  };
  return (
    <div className="container">
      <DashboardHeader />
      <div className="pageContainer dashboardContainer">
        <PrevLink link="/dashboard/admin" title="Revenir au dashboard" />
        <div className="heroTitle">
          <h1>Utilisateurs</h1>
          <h3>Gestion des utilisateurs</h3>
        </div>
        <div className="dashboardNav">
          <DashboardNavItem
            title={
              createUserFormOpen
                ? "Annuler la création"
                : "Créer un utilisateur"
            }
            dashboardNavItemClassName={
              createUserFormOpen
                ? "dashboardNavItem active"
                : "dashboardNavItem"
            }
            onClick={handleOpenCreateUserForm}
          />
          {createUserFormOpen ? <CreateUserForm /> : ""}
          <DashboardNavItem
            title={
              userSearchBarOpen
                ? "Fermer la recherche"
                : "Rechercher un utilisateur"
            }
            dashboardNavItemClassName={
              userSearchBarOpen ? "dashboardNavItem active" : "dashboardNavItem"
            }
            onClick={handleOpenUserSearchBar}
          />
          {userSearchBarOpen ? <SearchUser /> : null}
        </div>
      </div>
    </div>
  );
};

export default UsersDashboardPage;
