import axios from "axios";
import { jwtDecode } from "jwt-decode";
import apiPath from "./apiPath";

function authenticate(credentials) {
    return axios
        .post(apiPath("login_check"), credentials)
        .then((response) => {
           return response.data.token;
        })
        .then(token => {
            // Stock the token in the local storage
            window.localStorage.setItem("authToken", token);
            // Inform axios that we have a default header on all requests HTTP 
            setAxiosToken(token);

            return true
        });
}


function logout () {
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"];
}


function setAxiosToken (token) {
    return axios.defaults.headers["Authorization"] = "Bearer " + token;
};

function setup () {
    //  Check for a token
    const token = window.localStorage.getItem("authToken");
    // If token is valid, set the axios token
    if(token){
        const jwtData = jwtDecode(token);
        if((jwtData.exp * 1000) > new Date().getTime()){
           setAxiosToken(token);
        } else {
            logout();
        }   
    } else {
        logout();
    }
}; 

function isAuthenticated() {
    const token = window.localStorage.getItem("authToken");
    if(token){
        const jwtData = jwtDecode(token);
        if((jwtData.exp * 1000) > new Date().getTime()){
           return true;
        } else {
        return false;
        }   
    }
    return false;
}
function getUserType(){
    const token = window.localStorage.getItem("authToken");
    if(token){
        const jwtData = jwtDecode(token);
        if((jwtData.roles[0]) === "ROLE_ADMIN"){
            return 'admin';
        } else if ((jwtData.type) === "Employé"){
            return 'employé';
        } else if ((jwtData.type) === "Vétérinaire") {
            return 'vétérinaire';
        } else {
            return false;
        }
    }  
}
export default {
    authenticate,
    logout,
    setup,
    isAuthenticated,
    getUserType,
    
};