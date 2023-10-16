import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post('http://backend.chalanka.me/login', { username, password, role });
      if (res.data.Login) {
        if (res.data.role === 'admin') {
          navigate('/dash');
        } else if (res.data.role === 'superadmin') {
          navigate('/superadmin');
        } else {
          navigate('/');
        }
      } else {
        setLoginError('Login failed. Please check your credentials and try again.');
      }
    } catch (error) {
      console.log(error);
      setLoginError('An error occurred during login. Please try again.');
    }
  };

  return (
    <div className="main_body">
      <div className="container">
        <h1 className="title">Human Resourse Information System</h1>
        <div className="login-form">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="role">Role :</label>
              <select
                type="text"
                className="form-control"
                id="role"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value=""></option>
                <option value="admin">Admin</option>
                <option value="superadmin">SuperAdmin</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
            {loginError && <p className="error-message">{loginError}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
