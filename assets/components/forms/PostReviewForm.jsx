import React, { useEffect, useState } from "react";
import CustomButton from "../CustomButton";
import reviewsApi from "../../services/reviewsApi";
import { useMediaQuery } from "react-responsive";

const PostReviewForm = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const [username, setUsername] = useState();
  const [review, setReview] = useState();
  const [errors, setErrors] = useState({});
  const [succesMessage, setSuccesMessage] = useState();
  const [submitSuccess, setSubmitSuccess] = useState(false);
  let data = {};
  /**
   * Submits the review form.
   * @param {*} e
   */
  const handleSubmit = async (e) => {
    setSuccesMessage("");
    setErrors({});
    e.preventDefault();
    data = {
      username: username,
      review: review,
    };

    try {
      await reviewsApi.postReview(data).then(() => {
        setSubmitSuccess(true);
        setSuccesMessage("Votre avis a bien été envoyé !");
        setUsername("");
        setReview("");
        setErrors({});
      });
    } catch (error) {
      if (error.response && error.response.data) {
        const violations = error.response.data;
        if (violations) {
          const apiErrors = {};
          violations.forEach(({ propertyPath, title }) => {
            apiErrors[propertyPath] = title;
          });
          setErrors(apiErrors);
        }
      }
    }
  };

  return (
    <form>
      <label className="formLabel" htmlFor="username">
        Pseudonyme
      </label>
      <input
        className="formInput"
        type="text"
        id="username"
        name="username"
        value={username ?? ""}
        required
        onChange={(e) => setUsername(e.target.value)}
      />
      {errors.username && <p className="errorMessage">{errors.username}</p>}
      <label className="formLabel" htmlFor="review">
        Votre avis
      </label>
      <textarea
        className="input"
        id="review"
        name="review"
        value={review ?? ""}
        required
        onChange={(e) => setReview(e.target.value)}
      />
      {errors.review && <p className="errorMessage">{errors.review}</p>}

      <CustomButton
        id="postReviewSubmitButton"
        title="Envoyer"
        buttonClassName={
          isDesktop ? "smallDesktopButton" : "mediumMobileButton"
        }
        type="submit"
        submitSuccess={submitSuccess}
        succesMessage={succesMessage}
        onClick={handleSubmit}
      />
    </form>
  );
};

export default PostReviewForm;
