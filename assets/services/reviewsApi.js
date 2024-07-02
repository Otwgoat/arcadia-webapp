import axios from "axios";
import apiPath from "./apiPath";


function getReviews (limit) {
    return axios.get(apiPath(`reviews?limit=${limit}`)).then((response) => {return response.data});
}

function postReview (data) {
    return axios.post(apiPath('add-review'), data);
}

function getUnapprovedReviews () {
    return axios.get(apiPath('avis-non-approuves')).then((response) => {return response.data});
}
function approveReview (id) {
    return axios.put(apiPath(`review/${id}/approbation`));
}
function  deleteReview (id) {
    return axios.delete(apiPath(`review/${id}/suppression`));
}
export default { getReviews, postReview, getUnapprovedReviews , approveReview, deleteReview};
