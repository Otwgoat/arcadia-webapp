import React, { useEffect, useState } from "react";
import DashboardHeader from "../../components/dashboards/DashboardHeader";
import PrevLink from "../../components/dashboards/admin/PrevLink";
import { useQuery } from "@tanstack/react-query";
import animalsApi from "../../services/animalsApi";
import { getViewsData } from "../../services/firebase";
import { useMediaQuery } from "react-responsive";
import CustomButton from "../../components/CustomButton";

const AnimalsViewsCountDashboardPage = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const [animalViews, setAnimalViews] = useState();
  const [updatedAnimals, setUpdatedAnimals] = useState();
  const { data: animals } = useQuery({
    queryKey: ["animals"],
    queryFn: () => animalsApi.getAnimals(),
  });

  /**
   * Fetches the views data from the firebase database.
   */
  useEffect(() => {
    const loadData = async () => {
      try {
        const views = await getViewsData();
        setAnimalViews(views);
      } catch (error) {
        console.error("Error in getViewsData API call:", error);
        throw error;
      }
    };
    loadData();
  }, [animals]);
  
  useEffect(() => {
    /**
     * Updates the animals with their respective views count.
     */
    const updateAnimals = () => {
      if (
        animals &&
        animals.length > 0 &&
        animalViews &&
        animalViews.length > 0
      ) {
        const newUpdatedAnimals = animals.map((animal) => {
          const viewsData = animalViews.find(
            (view) => view.animalId === animal.id.toString()
          );
          return { ...animal, views: viewsData ? viewsData.views : 0 };
        });
        newUpdatedAnimals.sort((a, b) => b.views - a.views);
        setUpdatedAnimals(newUpdatedAnimals);
      }
    };
    updateAnimals();
  }, [animalViews]);

  return (
    <div className="container">
      <DashboardHeader />
      <div className="pageContainer dashboardContainer">
        <PrevLink link="/dashboard" title="Retour au dashboard" />
        <div className="heroTitle">
          <h1>Nombre de vue</h1>
          <h3>Classement des animaux par nombre de vue</h3>
        </div>
        <div id="animalsLeaderBoardContainer">
          {updatedAnimals &&
            updatedAnimals.map((animal, index) => (
              <div
                key={index}
                className={`leaderBoardItem ${
                  index % 2 === 0 ? "even" : "odd"
                }`}
              >
                <p>
                  {animal.firstName} - {animal.race}
                </p>
                <p>
                  {animal.views} {animal.views > 1 ? "vues" : "vue"}
                </p>
              </div>
            ))}
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

export default AnimalsViewsCountDashboardPage;
