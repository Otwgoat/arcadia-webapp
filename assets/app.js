import React, { useState } from 'react';
import {createRoot} from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/index.scss';
import Home from './pages/Home';
import AuthContext from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import authApi from './services/authApi';
import PrivateRoute from './routing/PrivateRoute';
import Dashboard from './pages/Dashboard';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ServicesDashboardPage from './pages/adminDashboard/ServicesDashboardPage';
import UsersDashboardPage from './pages/adminDashboard/UsersDashboardPage';
import AnimalsDashboardPage from './pages/adminDashboard/AnimalsDashboardPage';
import AnimalDashboardPage from './pages/adminDashboard/AnimalDashboardPage';
import HabitatsDashboardPage from './pages/adminDashboard/HabitatsDashboardPage';
import HabitatDashboardPage from './pages/adminDashboard/HabitatDashboardPage';


authApi.setup();
const queryClient = new QueryClient();
const App = () => {
    const [isAuthenticated , setIsAuthenticated] = useState(authApi.isAuthenticated());
    return (
        <QueryClientProvider client={queryClient}>
            <AuthContext.Provider value={{
                isAuthenticated,
                setIsAuthenticated
            }}>
           
                <BrowserRouter>
                    <Routes>
                        <Route path='/dashboard' element={<PrivateRoute />}>
                            <Route path='/dashboard' element={<Dashboard />} />
                        </Route>
                        <Route path="/dashboard/admin/utilisateurs" element={<PrivateRoute />}>
                            <Route path="/dashboard/admin/utilisateurs" element={<UsersDashboardPage />} />
                        </Route>
                        <Route path='/dashboard/admin/services' element={<PrivateRoute />} >
                            <Route path='/dashboard/admin/services' element={<ServicesDashboardPage />} />
                        </Route>
                        <Route path='/dashboard/admin/animaux' element={<PrivateRoute />} >
                            <Route path='/dashboard/admin/animaux' element={<AnimalsDashboardPage />} />
                        </Route>
                        <Route path='/dashboard/admin/animal/:id' element={<PrivateRoute />} >
                            <Route path='/dashboard/admin/animal/:id' element={<AnimalDashboardPage />} />
                        </Route> 
                        <Route path='/dashboard/admin/habitats' element={<PrivateRoute />} >
                           <Route path='/dashboard/admin/habitats' element={<HabitatsDashboardPage/>} /> 
                        </Route>   
                        <Route path='/dashboard/admin/habitat/:id' element={<PrivateRoute />} >
                            <Route path='/dashboard/admin/habitat/:id' element={<HabitatDashboardPage/>} />
                        </Route>

                        <Route path="/" element={<Home />} />
                        <Route path="/connexion" element={<LoginPage />} />

                    </Routes>
                </BrowserRouter>
            
            </AuthContext.Provider>
        </QueryClientProvider>
    );

}

export default App;
const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);