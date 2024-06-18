import axios from "axios";
import apiPath from "./apiPath";

function getReviews () {
    return axios.get(apiPath('reviews')).then((response) => {return response.data});
}

function postReview (data) {
    return axios.post(apiPath('add-review'), data);
}
export default { getReviews, postReview };