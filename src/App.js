import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./assets/scss/style.scss";
import "./assets/css/materialdesignicons.min.css";

import { AuthProvider, useAuth } from './contexts/AuthContext';

import Index from './pages';
import Register from './pages/register';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Logout from './pages/logout';

import LapanganList from './components/in/lapanganList';
import LapanganForm from './components/in/lapanganForm';

const PrivateRoute = ({ element: Element }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Element /> : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Index/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard/*' element={<PrivateRoute element={Dashboard} />}>
          <Route index element={<LapanganList />} />
          <Route path="add-lapangan" element={<LapanganForm />} />
          <Route path="list-lapangan" element={<LapanganList />} />
        </Route>
        <Route path='/logout' element={<Logout />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
