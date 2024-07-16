import axios from "axios";
import apiPath from "./apiPath";

// This is a userApi object that contains several API functions related to user management

const userApi = {
    
    // Function to create a new user
    createUser: async (userData) => {
        try {
            const response = await axios.post(apiPath('admin/creation-utilisateur'), userData);
            return response.data;
        } catch (error) {
            console.error("Error in createUser API call:", error);
            throw error;
        }
    },
    
    // Function to get all users
    getUsers: async () => {
        try {
            const response = await axios.get(apiPath('admin/users'));
            return response.data;
        } catch (error) {
            console.error("Error in getUsers API call:", error);
            throw error;
        }
    },
    
    // Function to delete a user by their ID
    deleteUser: async (userId) => {
        try {
            const response = await axios.delete(apiPath(`admin/utilisateur/${userId}/suppression`));
            return response.data;
        } catch (error) {
            console.error("Error in deleteUser API call:", error);
            throw error;
        }
    },
    
    // Function to get the current logged-in user
    getCurrentUser: async () => {
        try {
            const response = await axios.get(apiPath('utilisateur-connecte'));
            return response.data;
        } catch (error) {
            console.error("Error in getCurrentUser API call:", error);
            throw error;
        }
    }

};

export default userApi;