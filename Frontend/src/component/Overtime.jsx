import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Overtime.css';
import { FaEdit, FaTrash } from 'react-icons/fa';


export default function Overtime() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchOvertimes = async () => {
      try {
        const res = await axios.get('http://backend.chalanka.me/overtimes');
        setSearchResults(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOvertimes();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this overtime?");
  if (confirmDelete) {
    try {
      await axios.delete(`http://backend.chalanka.me/overtimes/${id}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }
  };
   const handleSearch = async () => {
    try {
      const response = await axios.get(`http://backend.chalanka.me/overtimes`);
      const { data } = response;
    


      const filteredResults = data.filter((overtime) => {
        const employeeNameLower = overtime.employeeName.toLowerCase();
        const empNoLower = overtime.empNo.toLowerCase();
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
    <div className="overtime">
      <h1>Overtime</h1>
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
          <Link className="Addovertime" to="/addovertime">
            Add overtime
          </Link>
        </button>

        <table className="table">
          <thead>
            <tr>
            <th>Employee No</th>
              <th>Employee Name</th>
              <th>Date</th>
              <th>Hours</th>
              <th>Rate</th>
              <th>Payment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((overtime) => (
              <tr key={overtime.id}>
              <td>{overtime.empNo}</td>
                <td>{overtime.employeeName}</td>
                <td>{overtime.date}</td>
                <td>{overtime.hours}</td>
                <td>{overtime.rate}</td>
                <td>{overtime.payment}</td>
                <td>
                <div className="actions">
        <Link to={`/updateovertime/${overtime.id}`}>
          <button className="update">
            <FaEdit /> {/* Icon for updating employee */}
          </button>
        </Link>
        <button className="delete" onClick={() => handleDelete(overtime.id)}>
          <FaTrash /> {/* Icon for deleting employee */}
        </button>
      </div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}

