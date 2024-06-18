import axios from "axios";
import apiPath from "./apiPath";

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
    }
};
export default animalsApi;