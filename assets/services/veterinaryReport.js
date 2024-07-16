import axios from "axios";
import apiPath from "./apiPath";

const veterinaryApi = {
    /**
     * Create a new veterinary report on the database. 
     * @param {*} data 
     * @returns 
     */
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