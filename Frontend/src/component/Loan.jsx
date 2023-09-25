import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Loan.css';
import { FaEdit, FaTrash } from 'react-icons/fa';


export default function Loan() {
    const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const res = await axios.get('http://localhost:8080/loans');
        setSearchResults(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchLoans();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this loan?");
  if (confirmDelete) {
    try {
      await axios.delete(`http://localhost:8080/loans/${id}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }
  };
  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:8080/loans');
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
    <div className="loan">
      <h1>Loan</h1>

      
      <div className="search">
  <input
    type="text"
    placeholder="Search..."
    value={searchTerm}
    onChange={e => setSearchTerm(e.target.value)}
    onKeyPress={handleKeyPress}
  />
  <button className="search-button" onClick={handleSearch}>Search</button>
</div>
      <div>
        <button className="Add">
          <Link className="Addloan" to="/addloan">
            Add Loan
          </Link>
        </button>

        <table className="table">
          <thead>
            <tr>
            <th>Employee No</th>
              <th>Employee Name</th>
              <th>Amount</th>
              <th>Interest Rate</th>
              <th>Duration</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((loan) => (

              <tr key={loan.id}>
                <td>{loan.empNo}</td>
                <td>{loan.employeeName}</td> 
                <td>{loan.amount}</td>
                <td>{loan.interestRate}</td>
                <td>{loan.duration}</td>
                <td>
                <div className="loan_actions">
        <Link to={`/updateloan/${loan.id}`}>
          <button className="update">
            <FaEdit /> {/* Icon for updating employee */}
          </button>
        </Link>
        <button className="delete" onClick={() => handleDelete(loan.id)}>
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
