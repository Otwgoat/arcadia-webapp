import React, { useEffect, useState } from "react";
import reviewsApi from "../../services/reviewsApi";
import CustomButton from "../CustomButton";
import { useQuery } from "@tanstack/react-query";
import PostReviewForm from "../forms/PostReviewForm";
import { useMediaQuery } from "react-responsive";

const Reviews = ({ mediaQuery }) => {
  const isTablet = useMediaQuery({ query: "(min-width: 700px)" });
  const [itemCount, setItemCount] = useState(() => {
    if (mediaQuery) {
      return 6;
    } else if (!mediaQuery && isTablet) {
      return 4;
    } else {
      return 3;
    }
  });
  const [postReviewFormActive, setPostReviewFormActive] = useState(false);
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
      <div id="reviewButtons">
        {reviews && reviews.reviews.length !== reviews.totalCount ? (
          <CustomButton
            title="En voir plus"
            buttonClassName={
              mediaQuery ? "smallDesktopButton" : "mediumMobileButton"
            }
            onClick={() => {
              reviews && reviews.reviews.length !== reviews.totalCount
                ? setItemCount(mediaQuery ? itemCount + 6 : itemCount + 3)
                : null;
            }}
          />
        ) : null}
        <CustomButton
          buttonClassName={
            mediaQuery ? "smallDesktopButton" : "mediumMobileButton"
          }
          title={postReviewFormActive ? "Fermer" : "Écrire un avis"}
          id="writeReviewButton"
          onClick={() => setPostReviewFormActive(!postReviewFormActive)}
        />
        {postReviewFormActive && <PostReviewForm />}
      </div>
    </div>
  );
};

export default Reviews;
