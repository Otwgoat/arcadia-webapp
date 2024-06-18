import axios from "axios";
import apiPath from "./apiPath";

const habitatsApi = {
    getHabitats: async () => {
        try {
            const response = await axios.get(apiPath('habitats'));
            return response.data;
        } catch (error) {
            console.error("Error in getHabitats API call:", error);
            throw error;
        }
    },
}
export default habitatsApi;