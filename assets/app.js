import React from 'react';
import {createRoot} from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/index.scss';
import Home from './pages/Home';
import { AuthProvider } from './context/AuthContext';
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
import ConsultationsDashboardPage from './pages/veterinaryDashboard/ConsultationsDashboardPage';
import AnimalFilesDashboardPage from './pages/veterinaryDashboard/AnimalFilesDashboardPage';
import HabitatCommentsDashboardPage from './pages/veterinaryDashboard/HabitatCommentsDashboardPage';



authApi.setup();
const queryClient = new QueryClient();
const App = () => {

    
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
           
                <BrowserRouter>
                    <Routes>
                        <Route path='/dashboard' element={<PrivateRoute />}>
                            <Route path='/dashboard' element={<Dashboard />} />
                        </Route>
                        <Route path="/dashboard/admin/utilisateurs"  element={<PrivateRoute role="admin" />}>
                            <Route path="/dashboard/admin/utilisateurs" element={<UsersDashboardPage />} />
                        </Route>
                        <Route path='/dashboard/admin/services' element={<PrivateRoute role="admin" />} >
                            <Route path='/dashboard/admin/services' element={<ServicesDashboardPage />} />
                        </Route>
                        <Route path='/dashboard/admin/animaux' element={<PrivateRoute role="admin"/>} >
                            <Route path='/dashboard/admin/animaux' element={<AnimalsDashboardPage />} />
                        </Route>
                        <Route path='/dashboard/admin/animal/:id' element={<PrivateRoute role="admin"/>} >
                            <Route path='/dashboard/admin/animal/:id' element={<AnimalDashboardPage />} />
                        </Route> 
                        <Route path='/dashboard/admin/habitats' element={<PrivateRoute role="admin"/>} >
                           <Route path='/dashboard/admin/habitats' element={<HabitatsDashboardPage/>} /> 
                        </Route>   
                        <Route path='/dashboard/admin/habitat/:id' element={<PrivateRoute role="admin" />} >
                            <Route path='/dashboard/admin/habitat/:id' element={<HabitatDashboardPage/>} />
                        </Route>
                        <Route path='/dashboard/veterinaire/consultations' element={<PrivateRoute role="veterinary" />} >
                            <Route path='/dashboard/veterinaire/consultations' element={<ConsultationsDashboardPage />} />
                        </Route>
                        <Route path="/dashboard/veterinaire/dossier-animal" element={<PrivateRoute role="veterinary" />} >
                            <Route path="/dashboard/veterinaire/dossier-animal" element={<AnimalFilesDashboardPage />} />
                        </Route>
                        <Route path='/dashboard/veterinaire/habitats' element={<PrivateRoute role="veterinary" />} >
                            <Route path='/dashboard/veterinaire/habitats' element={<HabitatCommentsDashboardPage />} />
                        </Route>

                        <Route path="/" element={<Home />} />
                        <Route path="/connexion" element={<LoginPage />} />

                    </Routes>
                </BrowserRouter>
            
            </AuthProvider>
        </QueryClientProvider>
    );

}

export default App;
const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);