
/**
 * Determines the API path based on the environment.
 * @param {*} path 
 * @returns 
 */
function apiPath (path) {
    if (process.env.NODE_ENV === 'development') {
        return 'http://localhost:8000/api/' + path;
    } else {
        return 'https://arcadia-webapp-80ad1704e101.herokuapp.com/api/' + path;
    }
    
}

export default apiPath;