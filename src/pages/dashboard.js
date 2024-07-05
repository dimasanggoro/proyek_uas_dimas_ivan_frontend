import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, NavLink, useNavigate, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faPlus, faList, faSignOutAlt, faBars } from '@fortawesome/free-solid-svg-icons';
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
      <div className={`sidebar-wrapper d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary ${sidebarVisible ? '' : 'hidden'}`}>
        <h2>Sidebar</h2>
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-link link-body-emphasis">
            <NavLink className="nav-link link-body-emphasis" to="/dashboard" end>
            <FontAwesomeIcon className="bi pe-none me-2" icon={faTachometerAlt} />Dashboard
            </NavLink>
          </li>
          <li className="nav-link link-body-emphasis">
            <NavLink className="nav-link link-body-emphasis" activeClassName="active" to="/dashboard/add-lapangan">
            <FontAwesomeIcon className="bi pe-none me-2" icon={faPlus} />Add Lapangan
            </NavLink>
          </li>
          <li className="nav-link link-body-emphasis">
            <NavLink className="nav-link link-body-emphasis" activeClassName="active" to="/dashboard/list-booking">
            <FontAwesomeIcon className="bi pe-none me-2" icon={faList} /> Booking List
            </NavLink>
          </li>
          <li className="nav-link link-body-emphasis">
            <NavLink className="nav-link link-body-emphasis" activeClassName="active" to="/dashboard/add-booking">
            <FontAwesomeIcon className="bi pe-none me-2" icon={faPlus} />Add Booking
            </NavLink>
          </li>
        </ul>
        <hr></hr>
        <button onClick={handleLogout} className="btn btn-primary">
        <FontAwesomeIcon icon={faSignOutAlt} />Logout
        </button>
      </div>
      <div className={`content-wrapper ${sidebarVisible ? '' : 'full-width'}`}>
        <div className="row">
          <div className="col-1">
            <button className="hamburger-button btn btn-primary" onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faBars} />
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
