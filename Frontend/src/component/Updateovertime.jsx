import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './Updateovertime.css';

export default function UpdateOvertime() {
  const [overtimeData, setOvertimeData] = useState({
    empNo: '',
    employeeName: '',
    date: '',
    hours: '',
    rate: '',
  });


  const location = useLocation();

  const overtimeId = location.pathname.split('/')[2];

  useEffect(() => {
    const fetchOvertime = async () => {
      try {
        const overtimeRes = await axios.get(`http://localhost:8080/overtimes/${overtimeId}`);
        const { employeeName, date, hours, empNo, rate } = overtimeRes.data;
        setOvertimeData({
          date,
          hours,
          rate,
          empNo,
          employeeName
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchOvertime();
  }, [overtimeId]);

  const handleChange = async (e) => {
    const { name, value } = e.target;

    setOvertimeData((prevOvertimeData) => ({
      ...prevOvertimeData,
      [name]: value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/overtimes/${overtimeId}`, overtimeData);
      alert('Overtime updated successfully.'); // You can show a success message if needed.
        
      // Navigate to the previous page with a reload
      window.history.back();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main-body">
  <div className="updateovertime">
      <h1>Update Overtime</h1>
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
            value={overtimeData.empNo}
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
            value={overtimeData.employeeName}
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
            value={overtimeData.date}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="hours" className="form-label">
            Hours
          </label>
          <input
            type="text"
            className="form-control"
            id="hours"
            name="hours"
            value={overtimeData.hours}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="rate" className="form-label">
            Rate
          </label>
          <select
            type="text"
            className="form-control"
            id="rate"
            name="rate"
            value={overtimeData.rate}
            onChange={handleChange}
          >
            <option value="">Rate</option>
            <option value="100">100</option>
            <option value="200">200</option>
            <option value="300">300</option>
            <option value="400">400</option>
            <option value="600">600</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary" onClick={handleClick}>
          Update
        </button>
      </form>
    </div>
    </div>
  );
}
