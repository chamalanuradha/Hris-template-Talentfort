import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './Addovertime.css';


export default function Addovertime() {
    const [employeeOptions, setEmployeeOptions] = useState([]);
    const [overtimeData, setOvertimeData] = useState({
      empNo: '',
      employeeName: '',
    date: '',   
    hours: '',
    rate: '',


    });
  
    const [filteredEmployeeOptions, setFilteredEmployeeOptions] = useState([]);
  
    useEffect(() => {
      const fetchLeaves = async () => {
        try {
          const res = await axios.get('http://localhost:8080/employees');
          const employees = res.data;
          setEmployeeOptions(employees);
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchLeaves();
    }, []);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
  
      if (name === 'empNo') {
        setOvertimeData((prevOvertimeData) => ({
          ...prevOvertimeData,
          [name]: value,
          employeeName: '',
        }));
        const filteredOptions = employeeOptions.filter((employee) =>
        employee.empNo.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredEmployeeOptions(filteredOptions);
      } else {
        setOvertimeData((prevOvertimeData) => ({
          ...prevOvertimeData,
          [name]: value,
        }));
      }
    };
    const handleSelectEmployee = (selectedEmployee) => {
      if (selectedEmployee) {
        setOvertimeData((prevOvertimeData) => ({
          ...prevOvertimeData,
          empNo: selectedEmployee.empNo,
          employeeName: selectedEmployee.fullName,
        }));
        setFilteredEmployeeOptions([]);
      }
    };
  
    const handleClick = async (e) => {
      e.preventDefault();
      try {
        await axios.post('http://localhost:8080/overtimes', overtimeData);
        alert('overtime added successfully.'); // You can show a success message if needed.
        
        // Navigate to the previous page with a reload
        window.history.back();
      } catch (error) {
        console.log(error);
      }
    };
  
    const handleReset = (e) => {
      e.preventDefault();
      setOvertimeData({
        empNo: '',
        employeeName: '',
        date: '',
        hours: '',
        rate: '',
      });
    };

  return (
    <div className='main-body'>
    <div className="addovertime">
      <h1>Add Overtime</h1>
      <form>
      <div className="mb-3">
      <label htmlFor="empNo" className="form-label">
              Employee No
            </label>
            <input
              className="form-control"
              id="empNo"
              name="empNo"
              value={overtimeData.empNo}
              onChange={handleChange}
              autoComplete="off"
            />
            {filteredEmployeeOptions.length > 0 && (
              <ul className="autocomplete-list">
                {filteredEmployeeOptions.map((employee) => (
                  <li key={employee.empNo} onClick={() => handleSelectEmployee(employee)}>
                    {employee.empNo} ({employee.fullName})
                  </li>
                ))}
              </ul>
            )}
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
