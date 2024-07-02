import React, { useEffect, useState } from "react";
import reviewsApi from "../../services/reviewsApi";
import CustomButton from "../CustomButton";
import { useQuery } from "@tanstack/react-query";

const Reviews = () => {
  const [itemCount, setItemCount] = useState(3);
  const {
    data: reviews,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["reviews", itemCount],
    queryFn: () => reviewsApi.getReviews(itemCount),
  });
  if (isLoading) {
    return console.log("chargement des avis...");
  }
  if (error) {
    console.log("An error occured:" + error.message);
  }

  return (
    <div id="reviewCardsContainer">
      {reviews &&
        reviews.reviews &&
        reviews.reviews.map((review) => (
          <div key={review.id} className="reviewCard">
            <div className="reviewCardHeader">
              <p className="subh1">{review.username}</p>
            </div>
            <div className="reviewBody">
              <p>{review.review}</p>
            </div>
          </div>
        ))}
      {reviews && reviews.reviews.length !== reviews.totalCount ? (
        <CustomButton
          title="En voir plus"
          buttonClassName="mediumMobileButton"
          onClick={() => {
            reviews && reviews.reviews.length !== reviews.totalCount
              ? setItemCount(itemCount + 3)
              : null;
          }}
        />
      ) : null}
    </div>
  );
};

export default Reviews;
