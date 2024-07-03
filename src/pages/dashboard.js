import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/sidebar.css';
import LapanganList from '../components/in/lapanganList'; // Ensure the path is correct

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUserData = localStorage.getItem('userData');
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
      } else {
        // If no user data found, navigate to login page
        navigate('/');
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    logout();
    localStorage.removeItem('userData');
    navigate('/');
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className={`sidebar-wrapper ${sidebarVisible ? '' : 'hidden'}`}>
        <h2>Sidebar</h2>
        <ul className="nav flex-column">
          <li className="nav-item"><Link to="/dashboard" className="nav-link">Dashboard</Link></li>
          <li className="nav-item"><a className="nav-link" href="/profile">Profile</a></li>
          <li className="nav-item"><a className="nav-link" href="/settings">Settings</a></li>
          <li className="nav-item"><button onClick={handleLogout} className="btn btn-primary">Logout</button></li>
        </ul>
      </div>
      <div className={`content-wrapper ${sidebarVisible ? '' : 'full-width'}`}>
        <div className="row">
          <div className="col-1">
            <button className="hamburger-button btn btn-primary" onClick={toggleSidebar}>
              ☰
            </button>
          </div>
          <div className="col-6">
            <h1>Welcome, {userData.username}!</h1>
          </div>
        </div>

        <LapanganList />


      </div>
    </div>
  );
};

export default Dashboard;
