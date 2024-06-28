import React from 'react'
import {  Navigate, Outlet} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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
