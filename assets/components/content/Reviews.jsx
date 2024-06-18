import React, { useEffect, useState } from "react";
import reviewsApi from "../../services/reviewsApi";
import CustomButton from "../CustomButton";
import { useQuery } from "@tanstack/react-query";

const Reviews = () => {
  const {
    data: reviews,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: reviewsApi.getReviews,
  });
  if (isLoading) {
    return console.log("chargement des avis...");
  }
  if (error) {
    console.log("An error occured:" + error.message);
  }

  return (
    <div id="reviewCardsContainer">
      {reviews.map((review) => (
        <div key={review.id} className="reviewCard">
          <div className="reviewCardHeader">
            <p className="subh1">{review.username}</p>
          </div>
          <div className="reviewBody">
            <p>{review.review}</p>
          </div>
        </div>
      ))}
      <CustomButton title="En voir plus" buttonClassName="mediumMobileButton" />
    </div>
  );
};

export default Reviews;
