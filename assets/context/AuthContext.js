import React, { useContext, useEffect, useState } from 'react'
import userApi from '../services/userApi';
import authApi from '../services/authApi';


const AuthContext = React.createContext({
    isAuthenticated: false,
    currentUser: {},
    setIsAuthenticated: () => {},
    setCurrentUser: () => {},
});
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(authApi.isAuthenticated());
    const [currentUser, setCurrentUser] = useState({});
  
    useEffect(() => {
      const checkAuthStatus = async () => {
        try {
          
          if (isAuthenticated) {
            const user = await userApi.getCurrentUser();
            setCurrentUser(user);
          }
        } catch (error) {
          console.error('Failed to check authentication status', error);
        }
      };
  
      checkAuthStatus();
    }, []);
   
    return (
      <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, currentUser, setCurrentUser }}>
        {children}
      </AuthContext.Provider>
    );
  };
  export const useAuth = () => useContext(AuthContext);