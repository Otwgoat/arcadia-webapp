import React from 'react'
import {  Navigate, Outlet} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * PrivateRoute component.
 * 
 * @param {Object} props - The component props.
 * @param {string} props.role - The role required to access the route.
 * @returns {JSX.Element} - The rendered PrivateRoute component.
 */
const PrivateRoute = ({role}) => {
  
  const { isAuthenticated, currentUser } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to={'/connexion'} />;
  } 
  if (isAuthenticated){
    if (role === 'admin' && currentUser.type !== 'Admin') {
      return <Navigate to={'/dashboard'} />;
    }
    if (role === 'veterinary' && currentUser.type !== 'Vétérinaire') {
      return <Navigate to={'/dashboard'} />;
    }
    if (role  === 'employee' && currentUser.type !== 'Employé') {
      return <Navigate to={'/dashboard'} />;
    }
    return <Outlet />;
  }
}
export default PrivateRoute;
