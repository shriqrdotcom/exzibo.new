import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Layout } from './components/Layout';
import { HomeScreen } from './screens/Home';
import { MenuScreen } from './screens/Menu';
import { CartScreen } from './screens/Cart';
import { ReservationsScreen } from './screens/Reservations';
import { AdminLogin } from './screens/AdminLogin';
import { AdminDashboard } from './screens/AdminDashboard';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAdmin } = useApp();
  if (!isAdmin) return <Navigate to="/admin/login" />;
  return <>{children}</>;
};

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomeScreen />} />
            <Route path="menu" element={<MenuScreen />} />
            <Route path="cart" element={<CartScreen />} />
            <Route path="reservations" element={<ReservationsScreen />} />
            <Route path="admin/login" element={<AdminLogin />} />
            <Route 
              path="admin/dashboard" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
