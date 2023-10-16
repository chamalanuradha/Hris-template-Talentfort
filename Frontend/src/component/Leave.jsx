import {React, useEffect, useState} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Leave.css';
import { FaEdit, FaTrash } from 'react-icons/fa';


export default function Leave() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const res = await axios.get('http://backend.chalanka.me/leaves');
        setSearchResults(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchLeaves();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this leave?");
  if (confirmDelete) {
    try {
      await axios.delete(`http://backend.chalanka.me/leaves/${id}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }
  };
   const handleSearch = async () => {
    try {
      const response = await axios.get(`http://backend.chalanka.me/leaves`);
      const { data } = response;

// Filter the payments whose employee names start with the search term
const filteredResults = data.filter((leave) => {
  const employeeNameLower = leave.employeeName.toLowerCase();
  const empNoLower = leave.empNo.toLowerCase();
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
    <div className="leave">
      <h1>Leave</h1>
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
          <Link className="Addleave" to="/addleave">
            Add Leave
          </Link>
        </button>

        <table className="table">
          <thead>
            <tr>
            <th>Employee No</th>
              <th>Employee Name</th>
              <th>Date</th>
              <th>Leave Hours</th>
              <th>Disction</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((leave) => (
              <tr key={leave.id}>
                <td>{leave.empNo}</td>
                <td>{leave.employeeName}</td> 
                <td>{leave.date}</td>
                <td>{leave.leaveHours}</td>
                <td>{leave.description}</td>
                <td>
                <div className="actions">
        <Link to={`/updateleave/${leave.id}`}>
          <button className="update">
            <FaEdit /> {/* Icon for updating employee */}
          </button>
        </Link>
        <button className="delete" onClick={() => handleDelete(leave.id)}>
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
  )
}
