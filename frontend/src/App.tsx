 import React, { Suspense, lazy } from 'react';
  import { Routes, Route, useLocation } from 'react-router-dom';
  import { AnimatePresence } from 'framer-motion';
  import LoadingSpinner from './components/common/LoadingSpinner';
  import AuthLayout from './layouts/AuthLayout';
  import DashboardLayout from './layouts/DashboardLayout';

  const Login = lazy(() => import('./pages/Login'));
  const Register = lazy(() => import('./pages/Register'));
  const Dashboard = lazy(() => import('./pages/Dashboard'));
  const Transactions = lazy(() => import('./pages/Transactions'));
  const Accounts = lazy(() => import('./pages/Accounts'));
  const Reports = lazy(() => import('./pages/Reports'));

  const App = () => {
    const location = useLocation();
    return (
      <AnimatePresence mode="wait">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes location={location} key={location.pathname}>
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
            <Route element={<DashboardLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/accounts" element={<Accounts />} />
              <Route path="/reports" element={<Reports />} />
            </Route>
          </Routes>
        </Suspense>
      </AnimatePresence>
    );
  };

  export default App;
