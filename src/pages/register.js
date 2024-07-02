import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import bgImg from '../assets/images/bg/bgregister.jpg';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [passw, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/register', {
        username,
        email,
        passw,
      });
      setAlertMessage('User registered successfully!');
      // Clear input fields
      setUsername('');
      setEmail('');
      setPassword('');
    } catch (error) {
      setAlertMessage('Registration failed: ' + error.message);
    }
  };

  return (
    <>
      <section className="bg-home d-flex align-items-center" style={{ backgroundImage: `url(${bgImg})` }}>
        <div className="bg-overlay bg-gradient-overlay"></div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="form-signin p-4 bg-white rounded shadow-md">
                {alertMessage && <div className="alert alert-info">{alertMessage}</div>}
                <form onSubmit={handleRegister}>
                  <h5 className="mb-3">Register Akun</h5>
                  <div className="form-floating mb-2">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Harry"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <label htmlFor="floatingInput">UserName</label>
                  </div>
                  <div className="form-floating mb-2">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingEmail"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="floatingEmail">Email</label>
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
                  <button className="btn btn-primary w-100" type="submit">
                    Register
                  </button>
                  <div className="col-12 text-center mt-3">
                    <span>
                      <span className="text-muted me-2">Sudah Punya Akun? </span>
                      <Link to="/login" className="text-dark fw-medium">
                        Sign in
                      </Link>
                    </span>
                  </div>
                  <p className="mb-0 text-muted mt-3 text-center">© {new Date().getFullYear()}</p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
