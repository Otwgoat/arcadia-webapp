import axios from "axios";
import apiPath from "./apiPath";


// This function retrieves reviews with a specified limit from the server.
// It makes a GET request to the 'reviews' endpoint with the provided limit parameter.
// The response data is then returned.
function getReviews(limit) {
    return axios.get(apiPath(`reviews?limit=${limit}`)).then((response) => {return response.data});
}

// This function sends a POST request to the server to add a new review.
// It takes in the review data as a parameter and sends it in the request body.
function postReview(data) {
    return axios.post(apiPath('add-review'), data);
}

// This function retrieves unapproved reviews from the server.
// It makes a GET request to the 'avis-non-approuves' endpoint.
// The response data is then returned.
function getUnapprovedReviews () {
    return axios.get(apiPath('avis-non-approuves')).then((response) => {return response.data});
}
// This function approves a review with the specified ID.
// It makes a PUT request to the 'review/{id}/approbation' endpoint.
function approveReview(id) {
    return axios.put(apiPath(`review/${id}/approbation`));
}
// This function deletes a review with the specified ID.
// It makes a DELETE request to the 'review/{id}/suppression' endpoint.
function deleteReview(id) {
    return axios.delete(apiPath(`review/${id}/suppression`));
}
export default { getReviews, postReview, getUnapprovedReviews , approveReview, deleteReview};
