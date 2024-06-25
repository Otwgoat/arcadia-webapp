import React, { useEffect, useState } from "react";
import SearchContainer from "../../SearchContainer";
import { useQuery } from "@tanstack/react-query";
import userApi from "../../../services/userApi";

const SearchUser = () => {
  const [rerender, setRerender] = useState(false);
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
    setRerender(false);
    try {
      await userApi.deleteUser(userId);
      setRerender(true);
    } catch (error) {
      console.error("Error in deleteUser API call:", error);
      throw error;
    }
  };
  const resultTemplate = (item) => {
    return (
      <>
        <h3>
          {item.lastName} {item.firstName}
        </h3>
        <XCircle
          size={20}
          weight="light"
          color="#cf322a"
          onClick={() => handleDeleteUser(item.id)}
        />
      </>
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
        rerender={rerender}
      />
    </>
  );
};

export default SearchUser;
