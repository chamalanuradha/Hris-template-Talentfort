import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './Payment.css';

export default function Payments() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axios.get('http://localhost:8080/payments');
        setSearchResults(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPayments();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this payment?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8080/payments/${id}`);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:8080/payments');
      const { data } = response;

      // Filter the payments whose employee names start with the search term
      const filteredResults = data.filter((payment) => {
        const employeeNameLower = payment.employeeName.toLowerCase();
        const empNoLower = payment.empNo.toLowerCase();
        const searchTermLower = searchTerm.toLowerCase();
        
        return employeeNameLower.startsWith(searchTermLower) || empNoLower.startsWith(searchTermLower);
      });

      setSearchResults(filteredResults);
    } catch (error) {
      console.error('Error performing search:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
   <div className="main-body">
      <div className="payment">
        <h1>Payment</h1>
        <div className="search">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>
        <div>
          <button className="Add">
            <Link className="Addpayment" to="/addpayment">
              Add Payment
            </Link>
          </button>
          <table className="table">
            <thead>
              <tr>
                <th rowSpan={2}>Emp No</th>
                <th rowSpan={2}>Employee Name</th>
                <th rowSpan={2}>Epf No</th>
                <th rowSpan={2}>Basic Salary</th>
                <th colSpan={3}>Additions</th>
                <th colSpan={3}>Deductions</th>
                <th rowSpan={2}>Net Paid</th>
                <th rowSpan={2}>Total Expense</th>
                <th rowSpan={2}>Attendence</th>
                <th rowSpan={2}>Action</th>
              </tr>
              <tr>
                <th>Travelling (Daily)</th>
                <th>Farewell</th>
                <th>Travelling</th>
                <th>Farewell</th>
                <th>EPF (8%)</th>
                <th>ETF (12%)</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.empNo}</td>
                  <td>{payment.employeeName}</td>
                  <td>{payment.epfNo}</td>
                  <td>{payment.salary}</td>
                  <td>{payment.travellingDaily}</td>
                  <td>{payment.farewell}</td>
                  <td>{payment.travelling}</td>
                  <td>{payment.dfarewell}</td>
                  <td>{payment.epf8}</td>
                  <td>{payment.etfContribution}</td>
                  <td>{payment.netpaid}</td>
                  <td>{payment.totalSalaryExpense}</td>
                  <td>{payment.attendingDays}</td>
                  <td>
                  <div className="actions">
        <Link to={`/updatepayment/${payment.id}`}>
          <button className="update">
            <FaEdit /> {/* Icon for updating employee */}
          </button>
        </Link>
        <button className="delete" onClick={() => handleDelete(payment.id)}>
          <FaTrash /> {/* Icon for deleting employee */}
        </button>
      </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
