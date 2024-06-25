import axios from "axios";
import apiPath from "./apiPath";
import { update } from "firebase/database";


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
    deleteAnimalImage: async (imageId) => {
        try {
            const response = await axios.delete(apiPath(`admin/animal/suppression-image/${imageId}`));
            return response.data;
        } catch (error) {
            console.error("Error in deleteAnimalImage API call:", error);
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
    }
};
export default animalsApi;