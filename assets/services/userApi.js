import axios from "axios";
import apiPath from "./apiPath";

const userApi = {
    createUser: async (userData) => {
        try {
            const response = await axios.post(apiPath('admin/creation-utilisateur'), userData);
            return response.data;
        } catch (error) {
            console.error("Error in createUser API call:", error);
            throw error;
        }
    },
    getUsers: async () => {
        try {
            const response = await axios.get(apiPath('admin/users'));
            return response.data;
        } catch (error) {
            console.error("Error in getUsers API call:", error);
            throw error;
        }
    },
    deleteUser: async (userId) => {
        try {
            const response = await axios.delete(apiPath(`admin/utilisateur/${userId}/suppression`));
            return response.data;
        } catch (error) {
            console.error("Error in deleteUser API call:", error);
            throw error;
        }
    },

};

export default userApi;