import axios from "axios";
import apiPath from "./apiPath";
import { getAll } from "firebase/remote-config";




const animalsApi = {
    createAnimal: async (animalData) => {
        try {
            const response = await axios.post(apiPath('admin/creation-animal'), animalData);
            return response.data;
        } catch (error) {
            console.error("Error in createAnimal API call:", error);
            throw error;
        }
    },
    createAnimalImages: async (imagesData, animalId) => {
        try {
            const response = await axios.post(apiPath('admin/animal/creation-images'), {
                imagesData, 
                animalId
            });
            return response.data;
        } catch (error){
            console.error("Error in createAnimalImage API call:", error);
            throw error;
        }
    },
 
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
    deleteAnimal: async (animalId) => {
        try {
            const response = await axios.delete(apiPath(`admin/animal/${animalId}/suppression`));
            return response.data;
        } catch (error) {
            console.error("Error in deleteAnimal API call:", error);
            throw error;
        }
    },
    getAnimals: async () => {
        try {
            const response = await axios.get(apiPath('animals'));
            return response.data;
        } catch (error) {
            console.error("Error in getAnimals API call:", error);
            throw error;
        }
    },
    getAnimal: async (animalId) => {
        try {
            const response = await axios.get(apiPath(`animal/${animalId}`));
            return response.data;
        } catch (error) {
            console.error("Error in getAnimal API call:", error);
            throw error;
        }
    },
    getVeterinaryReports: async (animalId, limit) => {
        try {
            const response = await axios.get(apiPath(`animal/${animalId}/rapports-veterinaires?limit=${limit}`));
            return response.data;
        } catch (error) {
            console.error("Error in getVeterinaryReports API call:", error);
            throw error;
        }
    },
    getVeterinaryReportsByDate: async (date, limit) => {
        try {
            const response = await axios.get(apiPath(`animal/rapports-veterinaires/${date}?limit=${limit}`));
            return response.data;
        } catch (error) {
            console.error("Error in getVeterinaryReportsByDate API call:", error);
            throw error;
        }
    },
  
    getFeedingReports: async (animalId, limit) => {
        try {
            const response = await axios.get(apiPath(`animal/${animalId}/rapports-alimentation?limit=${limit}`));
            return response.data;
        } catch (error) {
            console.error("Error in getFeedingReports API call:", error);
            throw error;
        }
    },
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
