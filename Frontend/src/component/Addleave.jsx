import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Addleave.css';


export default function Addleave() {

  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [leaveData, setLeaveData] = useState({
    empNo: '',
    employeeName: '',
    date: '',
    leaveHours: '',
    description: '',
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
      setLeaveData((prevLeaveData) => ({
        ...prevLeaveData,
        [name]: value,
        employeeName: '', // Reset employeeName when empNo changes
      }));
      const filteredOptions = employeeOptions.filter((employee) =>
      employee.empNo.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredEmployeeOptions(filteredOptions);
  } else {
    setLeaveData((prevLeaveData) => ({
      ...prevLeaveData,
      [name]: value,
    }));
    }
  };

  const handleSelectEmployee = (selectedEmployee) => {
    if (selectedEmployee) {
      setLeaveData((prevLeaveData) => ({
        ...prevLeaveData,
        empNo: selectedEmployee.empNo,
        employeeName: selectedEmployee.fullName,
      }));
      setFilteredEmployeeOptions([]);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/leaves', leaveData);
      alert('Leave added successfully.'); // You can show a success message if needed.
        
        // Navigate to the previous page with a reload
        window.history.back();
    } catch (error) {
      console.log(error);
    }
  };

  const handleReset = async (e) =>{
    e.preventDefault();
    setLeaveData({
    empNo: '',
    employeeName: '',
    date: '',
    leaveHours: '',
    description: '',
    });
  }


  return(  

<div className="main-body">
    <div className="addleave">
  <h1>Add Leave</h1>
  <form>
  <div className="mb-3">
            <label htmlFor="empNo" className="form-label">
              Employee No
            </label>
            <input
              className="form-control"
              id="empNo"
              name="empNo"
              value={leaveData.empNo}
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
    <div className="buttons ">
  <button type="submit" className="btn btn-primary shadow save-button" onClick={handleClick}>
    Save
  </button>
  <button type="reset" className="btn btn-danger reset-button" onClick={handleReset}>
    Reset
  </button>
</div>
  </form>
</div>
</div>
);
}