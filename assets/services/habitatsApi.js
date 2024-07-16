import axios from "axios";
import apiPath from "./apiPath";

// This function makes an API call to get all habitats
const getHabitats = async () => {
    try {
        const response = await axios.get(apiPath('habitats'));
        return response.data;
    } catch (error) {
        console.error("Error in getHabitats API call:", error);
        throw error;
    }
};

// This function makes an API call to get a specific habitat by its ID
const getHabitat = async (habitatId) => {
    try {
        const response = await axios.get(apiPath(`habitat/${habitatId}`));
        return response.data;
    } catch (error) {
        console.error("Error in getHabitat API call:", error);
        throw error;
    }
};

// This function makes an API call to create a new habitat
const createHabitat = async (habitatData) => {
    try {
        const response = await axios.post(apiPath('admin/habitat-creation'), habitatData);
        return response.data;
    } catch (error) {
        console.error("Error in createHabitat API call:", error);
        throw error;
    }
};

// This function makes an API call to delete a habitat by its ID
const deleteHabitat = async (habitatId) => {
    try {
        const response = await axios.delete(apiPath(`admin/habitat/${habitatId}/suppression`));
        return response.data;
    } catch (error) {
        console.error("Error in deleteHabitat API call:", error);
        throw error;
    }
};

// This function makes an API call to update a habitat
const updateHabitat = async (habitatData) => {
    try {
        const response = await axios.put(apiPath(`admin/habitat/${habitatData.id}/modification`), habitatData);
        return response.data;
    } catch (error) {
        console.error("Error in updateHabitat API call:", error);
        throw error;
    }
};

// This function makes an API call to get all animals in a habitat by it's id
const getAnimals = async (habitatId) => {
    try {
        const response = await axios.get(apiPath(`habitat/${habitatId}/animaux`));
        return response.data;
    } catch (error) {
        console.error("Error in getAnimals API call:", error);
        throw error;
    }
};

// This function makes an API call to create a new report for a habitat
const createReport = async (reportData) => {
    try {
        const response = await axios.post(apiPath('habitat/creation-rapport'), reportData);
        return response.data;
    } catch (error) {
        console.error("Error in createReport API call:", error);
        throw error;
    }
};

const habitatsApi = {
    getHabitats,
    getHabitat,
    createHabitat,
    deleteHabitat,
    updateHabitat,
    getAnimals,
    createReport
};

export default habitatsApi;
