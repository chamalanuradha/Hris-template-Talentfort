import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './Addloan.css'


export default function AddLoan() {
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [loanData, setLoanData] = useState({
    empNo: '',
    employeeName: '',
    amount: '',
    interestRate: '',
    duration: '',
   
  });

  const [filteredEmployeeOptions, setFilteredEmployeeOptions] = useState([]);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const res = await axios.get('http://backend.chalanka.me/employees');
        const employees = res.data;
        setEmployeeOptions(employees);
      } catch (error) {
        console.log(error);
      }
    };

    fetchLoans();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'empNo') {
      setLoanData((prevLoanData) => ({
        ...prevLoanData,
        [name]: value,
        employeeName: '',
      }));
      const filteredOptions = employeeOptions.filter((employee) =>
      employee.empNo.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredEmployeeOptions(filteredOptions);
    } else {
      setLoanData((prevLoanData) => ({
        ...prevLoanData,
        [name]: value,
      }));
    }
  };
    const handleSelectEmployee = (selectedEmployee) => {
      if (selectedEmployee) {
        setLoanData((prevLoanData) => ({
          ...prevLoanData,
          empNo: selectedEmployee.empNo,
          employeeName: selectedEmployee.fullName,
        }));
        setFilteredEmployeeOptions([]);
      }
    };


    const handleClick = async (e) => {
      e.preventDefault();
      try {
        await axios.post('http://backend.chalanka.me/loans', loanData);
        alert('Loan added successfully.'); // You can show a success message if needed.
        
        // Navigate to the previous page with a reload
        window.history.back();
      } catch (error) {
        console.log(error);
      }
    };

  const handleReset = (e) => {
    e.preventDefault();
    setLoanData({
      empNo: '',
      employeeName: '',
      amount: '',
      interestRate: '',
      duration: '',
      
    });
  };

  return (
    <div className="main-body">
    
    <div className="addloan">
      <h1>Add Loan</h1>
      <form>
      <div className="mb-3">
            <label htmlFor="empNo" className="form-label">
              Employee No
            </label>
            <input
              className="form-control"
              id="empNo"
              name="empNo"
              value={loanData.empNo}
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
              value={loanData.employeeName}
              readOnly
            />
          </div>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">
            Amount
          </label>
          <select
            type="text"
            className="form-control"
            id="amount"
            name="amount"
            value={loanData.amount}
            onChange={handleChange}
          >
          <option value="">Amount</option>
          <option value="500000">500,000</option>
            <option value="1000000">1,000,000</option>
            <option value="5000000">5,000,000</option>
            <option value="10000000">10,000,000</option>
            <option value="50000000">50,000,000</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="interestRate" className="form-label">
            Interest Rate
          </label>
          <select
            className="form-control"
            id="interestRate"
            name="interestRate"
            value={loanData.interestRate}
            onChange={handleChange}
          >
            <option value="">IntrestRate</option>
            <option value="8">8%</option>
            <option value="12">12%</option>
            <option value="14">14%</option>
            <option value="15">15%</option>
            <option value="20">20%</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="duration" className="form-label">
            Duration
          </label>
          <select
            className="form-control"
            id="duration"
            name="duration"
            value={loanData.duration}
            onChange={handleChange}
          >
            <option value="">Duration</option>
            <option value="06 Months">06 Months</option>
            <option value="12 Months">12 Months</option>
            <option value="18 Months">18 Months</option>
            <option value="24 Months">24 months</option>
            <option value="36 Months">36 months</option>
            <option value="60 Months">60 Months</option>
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
  );
}
