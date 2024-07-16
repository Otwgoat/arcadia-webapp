import axios from "axios";
import apiPath from "./apiPath";

/**
 * Represents a collection of API methods for interacting with services.
 * @namespace servicesApi
 */
const servicesApi = {
    /**
     * Create a new service on the database.
     * @param {*} serviceData 
     * @returns 
     */
    createService: async (serviceData) => {
        try {
            const response = await axios.post(apiPath('admin/creation-service'), serviceData);
            return response.data;
        } catch (error) {
            console.error("Error in createService API call:", error);
            throw error;
        }
    },
    /**
     * Get all the services from the database.
     * @returns 
     */
    getServices: async () => {
        try {
            const response = await axios.get(apiPath('services'));
            return response.data;
        } catch (error) {
            console.error("Error in getServices API call:", error);
            throw error;
        }
    },
    /**
     * Delete a service from the database.
     * @param {*} serviceId 
     * @returns 
     */
    deleteService: async (serviceId) => {
        try {
            const response = await axios.delete(apiPath(`service/${serviceId}/suppression`));
            return response.data;
        } catch (error) {
            console.error("Error in deleteService API call:", error);
            throw error;
        }
    },
    /**
     * Update a service on the database.
     * @param {*} serviceId 
     * @param {*} serviceData 
     * @returns 
     */
    updateService: async (serviceId, serviceData) => {
        try {
            const response = await axios.put(apiPath(`service/${serviceId}/modification`), serviceData);
            return response.data;
        } catch (error) {
            console.error("Error in updateServices API call:", error);
            throw error;
        }
    },
    /**
     * Get planning data from the json doc 
     * 
     */
    getPlanning: async () => {
        try {
            const response = await axios.get(apiPath('horaires'));
            return response.data;
        } catch (error) {
            console.error("Error in getPlanning API call:", error);
            throw error;
        }
    },
    /**
     * Update planning on the json doc
     * @param {*} planningForm 
     * @returns 
     */
    updatePlanning: async (planningForm) => {
        try {
            const response = await axios.put(apiPath('admin/horaires/modification'), planningForm);
            return response.data;
        } catch (error) {
            console.error("Error in updatePlanning API call:", error);
            throw error;
        }
    }
};    
export default servicesApi;