import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import { useAuth } from '../contexts/AuthContext';
import bgImg from "../assets/images/bg/bglogin.jpg";

export default function Login() {
  const [username, setUsername] = useState('');
  const [passw, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', {
        username,
        passw: passw, // Send the hashed password
      });

      // Extract the token from the server response
      const { token } = response.data;

      const userData = {username, token}; 
      // Store user data in local storage
      localStorage.setItem('userData', JSON.stringify(userData));

      // After successful login
      login();
      navigate('/dashboard');
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <section className="bg-home d-flex align-items-center" style={{backgroundImage:`url(${bgImg})`}}>
      <div className="bg-overlay bg-gradient-overlay"></div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="form-signin p-4 bg-white rounded shadow-md">
              <form onSubmit={handleSubmit}>
                <h5 className="mb-3">Silahkan sign in</h5>
                <div className="form-floating mb-2">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <label htmlFor="floatingInput">Username</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    value={passw}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>
                <button className="btn btn-primary w-100" type="submit">Sign in</button>
                <div className="col-12 text-center mt-3">
                  <span><span className="text-muted me-2">Don't have an account ?</span> <Link to="/register" className="text-dark fw-medium">Sign Up</Link></span>
                </div>
                {error && <p className="text-danger mt-3">{error}</p>}
                <p className="mb-0 text-muted mt-3 text-center">© {new Date().getFullYear()}</p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
