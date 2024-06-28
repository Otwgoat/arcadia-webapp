import axios from "axios";
import apiPath from "./apiPath";

const veterinaryApi = {
    createReport: async (data) => {
        try {
            const response = await axios.post(apiPath('animal/creation-rapport-veterinaire'), data);
            return response.data;
        } catch (error) {
            console.error("Error in createReport API call:", error);
            throw error;
        }
    }
};
export default veterinaryApi;