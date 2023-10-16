import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './Updateloan.css';


export default function UpdateLoan() {
  const [loanData, setLoanData] = useState({
    empNo: '',
    employeeName: '',
    amount: '',
    interestRate: '',
    duration: '',
    
  });

  const location = useLocation();

  const loanId = location.pathname.split('/')[2];

  useEffect(() => {
    const fetchLoan = async () => {
      try {
        const response = await axios.get(`http://backend.chalanka.me/loans/${loanId}`);
        const { empNo, employeeName,amount, interestRate, duration } = response.data;
        setLoanData({
          empNo,
          employeeName,
          amount,
          interestRate,
          duration,
         
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchLoan();
  }, [loanId]);

  const handleChange = async (e) => {
    const { name, value } = e.target;

    setLoanData((prevLoanData) => ({
      ...prevLoanData,
      [name]: value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://backend.chalanka.me/loans/${loanId}`, loanData);
      alert('Loan updated successfully.'); // You can show a success message if needed.
        
      // Navigate to the previous page with a reload
      window.history.back();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main-body">
    <div className="updateloan">
        <h1>Update Loan</h1>
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
              value={loanData.empNo}
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
    readOnly
    value={loanData.employeeName}
  />
</div>
          <div className="mb-3">
            <label htmlFor="amount" className="form-label">
              Amount
            </label>
            <select
              className="form-control"
              id="amount"
              name="amount"
              value={loanData.amount}
              onChange={handleChange}
            >
              <option value="">Amount</option>
              <option value="500000.00">500,000</option>
              <option value="1000000.00">1,000,000</option>
              <option value="5000000.00">5,000,000</option>
              <option value="10000000.00">10,000,000</option>
              <option value="50000000.00">50,000,000</option>
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
              <option value="">Select Rate</option>
              <option value="12">12%</option>
              <option value="14">14%</option>
              <option value="20">20%</option>
              <option value="8">8%</option>
              <option value="15">15%</option>
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
<button type="submit" className="btn btn-primary update-button" onClick={handleClick}>
          Update
        </button>
</div>
        </form>
      </div>
    </div>
  );
}
