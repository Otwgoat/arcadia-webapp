import axios from "axios";
import apiPath from "./apiPath";

const animalsApi = {
    /**
     * Creates a new animal in the database.
     * @param {*} animalData 
     * @returns 
     */
    createAnimal: async (animalData) => {
        try {
            const response = await axios.post(apiPath('admin/creation-animal'), animalData);
            return response.data;
        } catch (error) {
            console.error("Error in createAnimal API call:", error);
            throw error;
        }
    },
    /**
     * Updates an existing animal in the database.
     * @param {*} animalData 
     * @returns 
     */
    updateAnimal: async (animalData) => {
        try {
            const response = await axios.put(apiPath(`admin/animal/${animalData.id}/modification`), animalData);
            return response.data;
        }
        catch (error) {
            console.error("Error in updateAnimal API call:", error);
            throw error;
        }
    },
    /**
     * Deletes an animal from the database.
     * @param {*} animalId 
     * @returns 
     */
    deleteAnimal: async (animalId) => {
        try {
            const response = await axios.delete(apiPath(`admin/animal/${animalId}/suppression`));
            return response.data;
        } catch (error) {
            console.error("Error in deleteAnimal API call:", error);
            throw error;
        }
    },
    /**
     * Get all animals from the database.
     * @returns 
     */
    getAnimals: async () => {
        try {
            const response = await axios.get(apiPath('animals'));
            return response.data;
        } catch (error) {
            console.error("Error in getAnimals API call:", error);
            throw error;
        }
    },
    /**
     * Get an animal from the database by it's Id.
     * @param {*} animalId 
     * @returns 
     */
    getAnimal: async (animalId) => {
        try {
            const response = await axios.get(apiPath(`animal/${animalId}`));
            return response.data;
        } catch (error) {
            console.error("Error in getAnimal API call:", error);
            throw error;
        }
    },
    /**
     * Get all veterinary reports for an animal by It's Id.
     * @param {*} animalId 
     * @param {*} limit 
     * @returns 
     */
    getVeterinaryReports: async (animalId, limit) => {
        try {
            const response = await axios.get(apiPath(`animal/${animalId}/rapports-veterinaires?limit=${limit}`));
            return response.data;
        } catch (error) {
            console.error("Error in getVeterinaryReports API call:", error);
            throw error;
        }
    },
    /**
     * Get all veterinary reports ordered by date.
     * @param {*} date 
     * @param {*} limit 
     * @returns 
     */
    getVeterinaryReportsByDate: async (date, limit) => {
        try {
            const response = await axios.get(apiPath(`animal/rapports-veterinaires/${date}?limit=${limit}`));
            return response.data;
        } catch (error) {
            console.error("Error in getVeterinaryReportsByDate API call:", error);
            throw error;
        }
    },
    /**
     * Get all feeding reports for an animal by It's Id.
     * @param {*} animalId 
     * @param {*} limit 
     * @returns 
     */
    getFeedingReports: async (animalId, limit) => {
        try {
            const response = await axios.get(apiPath(`animal/${animalId}/rapports-alimentation?limit=${limit}`));
            return response.data;
        } catch (error) {
            console.error("Error in getFeedingReports API call:", error);
            throw error;
        }
    },
    /**
     * Creates a new feeding report in the database.
     * @param {*} feedingReportData 
     * @returns 
     */
    createFeedingReport: async (feedingReportData) => {
        try {
            const response = await axios.post(apiPath('animal/creation-rapport-alimentation'), feedingReportData);
            return response.data;
        } catch (error) {
            console.error("Error in createFeedingReport API call:", error);
            throw error;
        }
    }
};
export default animalsApi;
