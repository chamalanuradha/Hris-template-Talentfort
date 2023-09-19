import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Adduser.css';
import Superadminsidebar from '../component/Superadminsidebar';

export default function Adduser() {
    const [userData, setUserData] = useState({
      username: '',
      password: '',
      role: '',
    });
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
  
    const handleClick = async (e) => {
      e.preventDefault();
      try {
        await axios.post('http://localhost:8081/users', userData); // Pass companyData
        navigate('/users');
      } catch (error) {
        console.log(error);
      }
    };
    const handleReset = (e) => {
      e.preventDefault();
      setUserData({
      username: '',
      password: '',
      role: '',
      });
    };
    return (
      <div className="main-body">
      <div>
       <Superadminsidebar/>
       </div>
     <div className="adduser">
       <h1>Add User</h1>
       <form>
       <div className="mb-3">
              <label htmlFor="username" className="form-label">
                User Name
              </label>
              <input
    className="form-control"
    type="text"
    id="username"
    name="username"
    value={userData.username} // Bind the value to the state
    onChange={handleChange}
  />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
    className="form-control"
    type="password"
    id="password"
    name="password"
    value={userData.password} // Bind the value to the state
    onChange={handleChange}
  />
            </div>
            <div className="mb-3">
          <label htmlFor="role" className="form-label">
            Role
          </label>
          <select
            type="text"
            className="form-control"
            id="role"
            name="role"
            value={userData.role}
            onChange={handleChange}
          >
          <option value="">--Select--</option>
          <option value="admin">Admin</option>
            <option value="superadmin">Super Admin</option>
            <option value="user">User</option>
          </select>
        </div>
         <div className="buttons ">
   <button type="submit" className="btn btn-primary shadow save-button" onClick={handleClick}>
     Save
   </button>
   <button type="reset" className="btn btn-danger reset-button" onClick={ handleReset}>
     Reset
   </button>
  </div>
       </form>
     </div>
     </div>
    )
  }
  
