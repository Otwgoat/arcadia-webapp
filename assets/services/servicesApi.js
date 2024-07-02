import axios from "axios";
import apiPath from "./apiPath";

const servicesApi = {
    createService: async (serviceData) => {
        try {
            const response = await axios.post(apiPath('admin/creation-service'), serviceData);
            return response.data;
        } catch (error) {
            console.error("Error in createService API call:", error);
            throw error;
        }
    },
    getServices: async () => {
        try {
            const response = await axios.get(apiPath('services'));
            return response.data;
        } catch (error) {
            console.error("Error in getServices API call:", error);
            throw error;
        }
    },
    deleteService: async (serviceId) => {
        try {
            const response = await axios.delete(apiPath(`service/${serviceId}/suppression`));
            return response.data;
        } catch (error) {
            console.error("Error in deleteService API call:", error);
            throw error;
        }
    },
    updateService: async (serviceId, serviceData) => {
        try {
            const response = await axios.put(apiPath(`service/${serviceId}/modification`), serviceData);
            return response.data;
        } catch (error) {
            console.error("Error in updateServices API call:", error);
            throw error;
        }
    },
    getPlanning: async () => {
        try {
            const response = await axios.get(apiPath('horaires'));
            return response.data;
        } catch (error) {
            console.error("Error in getPlanning API call:", error);
            throw error;
        }
    },
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