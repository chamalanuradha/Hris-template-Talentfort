import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

import Superadminsidebar from '../component/Superadminsidebar';

export default function Updateuser() {
  const [userData, setUserData] = useState({
    username: '',
    role: '',
  });
  const navigate = useNavigate();
  const location = useLocation();

  const userId = location.pathname.split('/')[2];
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/users/${userId}`);
        const {username,role} = response.data;
        setUserData({
          username,
          role,
         
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [userId]);


  const handleChange = async (e) => {
    const { name, value } = e.target;

    setUserData((preUserData) => ({
      ...preUserData,
      [name]: value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/users/${userId}`, userData); // Pass companyData
      navigate('/users');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="main-body">
      <div>
       <Superadminsidebar/>
       </div>
     <div className="adduser">
       <h1>Update User</h1>
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
<button type="submit" className="btn btn-primary update-button" onClick={handleClick}>
          Update
        </button>
</div>
       </form>
     </div>
     </div>
  )
}
