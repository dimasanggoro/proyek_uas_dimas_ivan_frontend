import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/sidebar.css';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
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
          <li className="nav-item"><Link className="nav-link" to="/dashboard/add-lapangan">Add Lapangan</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/dashboard/list-booking">Booking List</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/dashboard/add-booking">Add Booking</Link></li>
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

        {/* This will render the component based on the route */}
        <div>
        <Outlet />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
