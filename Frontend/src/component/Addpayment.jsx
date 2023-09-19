import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './Addpayment.css';


export default function AddPayment() {
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [paymentData, setPaymentData] = useState({
    empNo: '',
    employeeName: '',
    epfNo: '', 
    salary: '',
    travellingDaily: '',
    farewell: '',
    travelling: '',
    dfarewall: '',
    attendingDays: '',
    date: '',
  });

  const [filteredEmployeeOptions, setFilteredEmployeeOptions] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axios.get('http://localhost:8081/employees');
        const employees = res.data;
        setEmployeeOptions(employees);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPayments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'empNo') {
      setPaymentData((prevPaymentData) => ({
        ...prevPaymentData,
        [name]: value,
        employeeName: '', 
        epfNo: '',// Reset employeeName when empNo changes
      }));

      const filteredOptions = employeeOptions.filter((employee) =>
        employee.empNo.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredEmployeeOptions(filteredOptions);
    } else {
      setPaymentData((prevPaymentData) => ({
        ...prevPaymentData,
        [name]: value,
      }));
    }
  };

  const handleSelectEmployee = (selectedEmployee) => {
    if (selectedEmployee) {
      setPaymentData((prevPaymentData) => ({
        ...prevPaymentData,
        empNo: selectedEmployee.empNo,
        employeeName: selectedEmployee.fullName,
        epfNo: selectedEmployee.epfNo,
      }));
      setFilteredEmployeeOptions([]);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8081/payments', paymentData);
      alert('Payment added successfully.'); // You can show a success message if needed.
        
      // Navigate to the previous page with a reload
      window.history.back();
    } catch (error) {
      console.log(error);
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    setPaymentData({
      empNo: '',
      employeeName: '',
      epfNo: '',
      salary: '',
      travellingDaily: '',
      farewell: '',
      travelling: '',
      dfarewall: '',
      attendingDays: '',
      date: '',
    });
  };

  return (
    <div className="main-body">
    <div className="addpayment">
        <h1>Add Payment</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="empNo" className="form-label">
              Employee No
            </label>
            <input
              className="form-control"
              id="empNo"
              name="empNo"
              value={paymentData.empNo}
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
              value={paymentData.employeeName}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label htmlFor="epfNo" className="form-label">
              EPF No
            </label>
            <input
              className="form-control"
              type="text"
              id="epfNo"
              name="epfNo"
              value={paymentData.epfNo}
              readOnly
            />
          </div>


          <div className="mb-3">
            <label htmlFor="salary" className="form-label">
              Salary
            </label>
            <input
              className="form-control"
              type="text"
              id="salary"
              name="salary"
              value={paymentData.salary}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="form-label">Additions</label>
            <div>
              <label htmlFor="travellingDaily" className="sub-label">
                Travelling (Daily)
              </label>
              <input
                className="form-control"
                type="text"
                id="travellingDaily"
                name="travellingDaily"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="farewell" className="sub-label">
                Farewell
              </label>
              <input
                className="form-control"
                type="text"
                id="farewell"
                name="farewell"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="travelling" className="sub-label">
                Travelling
              </label>
              <input
                className="form-control"
                type="text"
                id="travelling"
                name="travelling"
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <label className="form-label">Deductions</label>
            <div>
              <label htmlFor="dfarewall" className="sub-label">
                Farewell
              </label>
              <input
                className="form-control"
                type="text"
                id="dfarewell"
                name="dfarewell"
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <label htmlFor="attendingDays" className="form-label">
              Attending Days
            </label>
            <input
              className="form-control"
              type="text"
              id="attendingDays"
              name="attendingDays"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="date" className="form-label">
              Date
            </label>
            <input
              className="form-control"
              type="date"
              id="date"
              name="date"
              onChange={handleChange}
            />
          </div>
          <div className="buttons">
            <button
              type="submit"
              className="btn btn-primary shadow save-button"
              onClick={handleClick}
            >
              Save
            </button>
            <button type="reset" className="btn btn-danger reset-button"  onClick={handleReset}>
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
