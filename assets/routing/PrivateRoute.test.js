import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute'; // Votre composant de route privée
import { AuthProvider } from '../context/AuthContext';
import LoginPage from '../pages/LoginPage';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

test('redirects unauthenticated users to login page', () => {
  const content = 'Private content';
  const queryClient = new QueryClient();
  render(
        <HelmetProvider>
            <QueryClientProvider client={queryClient}>
                <AuthProvider value={{ isAuthenticated: false, setCurrentUser: () => {} }}>
                    <MemoryRouter initialEntries={['/private']}>
                        <PrivateRoute path="/dashboard">
                            <div>{content}</div>
                        </PrivateRoute>
                        <Routes>
                            <Route path="/connexion" element={<LoginPage />} />
                        </Routes>
                    </MemoryRouter>
         
                </AuthProvider>

            </QueryClientProvider>
         

    </HelmetProvider>
  
  );

  expect(screen.queryByText(content)).toBeNull();
  expect(screen.getByText('Connexion')).toBeInTheDocument();
});