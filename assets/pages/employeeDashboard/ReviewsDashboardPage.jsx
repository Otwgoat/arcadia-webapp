import React, { useEffect, useState } from "react";
import DashboardHeader from "../../components/dashboards/DashboardHeader";
import PrevLink from "../../components/dashboards/admin/PrevLink";
import { useQuery } from "@tanstack/react-query";
import reviewsApi from "../../services/reviewsApi";
import CustomButton from "../../components/CustomButton";

const ReviewsDashboardPage = () => {
  const { data: unapprovedReviews, error } = useQuery({
    queryKey: ["unapprovedReviews"],
    queryFn: () => reviewsApi.getUnapprovedReviews(),
  });
  const [reviews, setReviews] = useState();
  useEffect(() => {
    setReviews(unapprovedReviews);
  }, [unapprovedReviews]);

  const handleApproveReview = async (id) => {
    await reviewsApi.approveReview(id);
    setReviews(reviews.filter((review) => review.id !== id));
  };
  const handleDeleteReview = async (id) => {
    await reviewsApi.deleteReview(id);
    setReviews(reviews.filter((review) => review.id !== id));
  };
  return (
    <div className="container">
      <DashboardHeader />
      <div className="pageContainer dashboardContainer">
        <PrevLink link="/dashboard" title="Revenir au dashboard" />
        <div className="heroTitle">
          <h1>Avis visiteurs</h1>
          <h3>Valider les avis de nos visiteurs</h3>
        </div>
        <div id="reviewsList">
          {reviews ? (
            reviews.map((review) => (
              <div key={review.id} className="reviewCard">
                <p className="subh1">{review.username}</p>
                <p>{review.review}</p>
                <div className="actionButtons">
                  <CustomButton
                    title="Approuver le commentaire"
                    buttonClassName="smallMobileButton"
                    type="button"
                    onClick={() => handleApproveReview(review.id)}
                  />
                  <CustomButton
                    title="Supprimer le commentaire"
                    buttonClassName="smallLogoutButton"
                    type="button"
                    onClick={() => handleDeleteReview(review.id)}
                  />
                </div>
              </div>
            ))
          ) : (
            <p>Aucun avis à valider</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewsDashboardPage;
