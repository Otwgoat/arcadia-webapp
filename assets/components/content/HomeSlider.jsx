import React, { useEffect, useRef, useState } from "react";
import animalsApi from "../../services/animalsApi";
import { useQuery } from "@tanstack/react-query";
import { getFiles, getViewsData } from "../../services/firebase";
import { Swiper, SwiperSlide } from "swiper/react";
import CustomButton from "../CustomButton";
import { useMediaQuery } from "react-responsive";

const HomeSlider = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 700px)" });
  const [animalsToDisplayTop, setAnimalsToDisplayTop] = useState();
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [threeAnimals, setThreeAnimals] = useState();
  const [animalViews, setAnimalViews] = useState();
  const getPrincipalImage = async (folder, itemId) => {
    try {
      const images = await getFiles(`/${folder}/${itemId}`);
      if (images && images.length > 0) {
        const principalImage = images.find(
          (image) => image.isPrincipal === true
        );
        return principalImage ? principalImage.url : images[0].url;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const { data: animals, isError } = useQuery({
    queryKey: ["animals"],
    queryFn: animalsApi.getAnimals,
  });
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
    const sortAnimals = () => {
      if (
        animals &&
        animals.length > 0 &&
        animalViews &&
        animalViews.length > 0
      ) {
        const newAnimals = animals.map((animal) => {
          const viewsData = animalViews.find(
            (view) => view.animalId === animal.id.toString()
          );
          return { ...animal, views: viewsData ? viewsData.views : 0 };
        });
        newAnimals.sort((a, b) => b.views - a.views);
        setThreeAnimals(newAnimals.slice(0, 3));
      }
    };
    sortAnimals();
  }, [animalViews]);

  useEffect(() => {
    if (threeAnimals && threeAnimals.length > 0) {
      const loadImages = async () => {
        const newDisplayedAnimals = await Promise.all(
          threeAnimals.map(async (animal) => {
            const imageUrl = await getPrincipalImage("animals", animal.id);
            return { ...animal, imageUrl };
          })
        );
        setAnimalsToDisplayTop(newDisplayedAnimals);
      };
      loadImages();
    }
  }, [threeAnimals]);

  return (
    <div id="homeSlider" className="slider">
      <Swiper
        ref={swiperRef}
        spaceBetween={0}
        slidesPerView={1}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      >
        {animalsToDisplayTop &&
          animalsToDisplayTop.map((animal, index) => (
            <SwiperSlide key={index}>
              <img src={animal.imageUrl} alt={`image de ${animal.firstName}`} />
              <CustomButton
                buttonClassName={
                  isDesktop ? "smallDesktopButton" : "smallMobileButton"
                }
                title={`En savoir plus sur ${animal.firstName}`}
                path={`habitats/animal/${animal.id}`}
              />
            </SwiperSlide>
          ))}
      </Swiper>
      <div className="sliderContainer">
        {animalsToDisplayTop &&
          animalsToDisplayTop.length > 1 &&
          animalsToDisplayTop.map((animal, index) => (
            <span
              key={index}
              className={
                activeIndex === index
                  ? "sliderLink sliderLinkActive"
                  : "sliderLink"
              }
              onClick={() => swiperRef.current.swiper.slideTo(index)}
            />
          ))}
      </div>
    </div>
  );
};

export default HomeSlider;
