import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './Updateleave.css';


export default function Updateleaves() {
  const [leaveData, setLeaveData] = useState({
    employeeName: '',
    empNo: '',
    date: '',
    leaveHours: '',
    description: '',
  });


  const location = useLocation();

  const leaveId = location.pathname.split('/')[2];

  useEffect(() => {
    const fetchLeave = async () => {
      
      try {
        const response = await axios.get(`http://backend.chalanka.me/leaves/${leaveId}`);
        const { date, leaveHours, description, empNo ,employeeName } = response.data;
        setLeaveData({
          date,
          leaveHours,
          description,
          empNo,
          employeeName
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchLeave();
  }, [leaveId]);


 
  const handleChange = async (e) => {
    const { name, value } = e.target;
  
    setLeaveData((prevLeaveData) => ({
      ...prevLeaveData,
      [name]: value,
    }));
  };
  
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://backend.chalanka.me/leaves/${leaveId}`, leaveData);
      alert('Leave updated successfully.'); // You can show a success message if needed.
        
      // Navigate to the previous page with a reload
      window.history.back();
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div className="main-body">
  <div className="updateleave">
  <h1>Update Leave</h1>
  <form>
  <div className="mb-3">
            <label htmlFor="empNo" className="form-label">
              Employee No
            </label>
            <input
              type="text"
              className="form-control"
              id="empNo"
              name="empNo"
              value={leaveData.empNo}
              readOnly
            />
          </div>
    <div className="mb-3">
      <label htmlFor="employeeName" className="form-label">
        Employee Name
      </label>
      <input
        type="text"
        className="form-control"
        id="employeeName"
        name="employeeName"
        value={leaveData.employeeName}
        readOnly
      />
    </div>
    <div className="mb-3">
            <label htmlFor="date" className="form-label">
                Date
            </label>
            <input
                type="date"
                className="form-control"
                id="date"
                name="date"
                value={leaveData.date}
                onChange={handleChange}
            />
        </div>




    <div className="mb-3">
      <label htmlFor="leaveHours" className="form-label">
        Leave Hours
      </label>
      <select
        type="text"
        className="form-control"
        id="leaveHours"
        name="leaveHours"
        value={leaveData.leaveHours}
        onChange={handleChange}
      >
      <option value="">Leave Hours</option>
      <option value="2">Short leave</option>
      <option value="4">Half day</option>
        <option value="8">Full day</option>
        <option value="16">Two days</option>
        <option value="24">Three days</option>
      </select>
    </div>
    
    <div className="mb-3">
      <label htmlFor="description" className="form-label">
        Description
      </label>
      <input
        type="textarea"
        className="form-control"
        id="description"
        name="description"
        value={leaveData.description}
        onChange={handleChange}
     />
    </div>
    
   
    <button type="submit" className="btn btn-primary" onClick={handleClick} >
      Update
    </button>
  </form>
</div>
</div>
);
}