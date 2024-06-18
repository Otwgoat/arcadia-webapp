import React, { useState } from "react";
import SearchContainer from "../../SearchContainer";
import { useQuery } from "@tanstack/react-query";
import userApi from "../../../services/userApi";

const SearchUser = () => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery({ queryKey: ["users"], queryFn: userApi.getUsers });
  if (isLoading) {
    return console.log(isLoading);
  }
  if (error) {
    console.log("An error occured:" + error.message);
  }
  const handleDeleteUser = async (userId) => {
    try {
      await userApi.deleteUser(userId);
    } catch (error) {
      console.error("Error in deleteUser API call:", error);
      throw error;
    }
  };
  const resultTemplate = (item) => {
    return (
      <h3>
        {item.lastName} {item.firstName}
      </h3>
    );
  };
  return (
    <>
      <SearchContainer
        searchContainerId="searchUser"
        label="Rechercher un utilisateur"
        inputName="searchUser"
        inputPlaceholder="Nom de famille"
        iterableTerm="lastName"
        resultTemplate={resultTemplate}
        data={users}
        deleteOnClick={handleDeleteUser}
      />
    </>
  );
};

export default SearchUser;
