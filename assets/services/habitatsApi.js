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
    getHabitat: async (habitatId) => {
        try {
            const response = await axios.get(apiPath(`habitat/${habitatId}`));
            return response.data;
        } catch (error) {
            console.error("Error in getHabitat API call:", error);
            throw error;
        }
    },
    createHabitat: async (habitatData) => {
        try {
            const response = await axios.post(apiPath('admin/habitat-creation'), habitatData);
            return response.data;
        } catch (error) {
            console.error("Error in createHabitat API call:", error);
            throw error;
        }
    },
    deleteHabitat: async (habitatId) => {
        try {
            const response = await axios.delete(apiPath(`admin/habitat/${habitatId}/suppression`));
            return response.data;
        } catch (error) {
            console.error("Error in deleteHabitat API call:", error);
            throw error;
        }
    },
    updateHabitat: async (habitatData) => {
        try {
            const response = await axios.put(apiPath(`admin/habitat/${habitatData.id}/modification`), habitatData);
            return response.data;
        } catch (error) {
            console.error("Error in updateHabitat API call:", error);
            throw error;
        }
    },
    getAnimals: async (habitatId) => {
        try {
            const response = await axios.get(apiPath(`habitat/${habitatId}/animaux`));
            return response.data;
        } catch (error) {
            console.error("Error in getAnimals API call:", error);
            throw error;
        }
    },

}
export default habitatsApi;