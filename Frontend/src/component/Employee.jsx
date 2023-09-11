import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Employee.css';
import { FaEdit, FaTrash } from 'react-icons/fa';


export default function Employee() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get('http://localhost:8080/employees');
        setSearchResults(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this employee?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8080/employees/${id}`);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:8080/employees');
      const { data } = response;

      // Filter the employees whose names start with the search term
      const filteredResults = data.filter((employee) => {
        const employeeNameLower = employee.fullName.toLowerCase();
        const empNoLower =employee.empNo.toLowerCase();
        const searchTermLower = searchTerm.toLowerCase();
        return employeeNameLower.startsWith(searchTermLower)|| empNoLower.startsWith(searchTermLower);
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
      <div className="employee">
        <h1>Employee</h1>

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
            <Link className="Addemp" to="/addemployee">
              Add Employee
            </Link>
          </button>
          <table className="table">
            <thead>
              <tr>
                <th>Emp No</th>
                <th>Full Name</th>
                <th>Gender</th>
                <th>Maritalstatus</th>
                <th>Residence Address</th>
                <th>Phone</th>
                <th>Joined Date</th>
                <th>Company Name</th>
                <th>Designation</th>
                <th>Department</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((employee) => (
                <tr className="Dts" key={employee.id}>
                  <td>{employee.empNo}</td>
                  <td>{employee.fullName}</td>
                  <td>{employee.gender}</td>
                  <td>{employee.maritalStatus}</td>
                  <td>{employee.currentAddress}</td>
                  <td>{employee.phone}</td>
                  <td>{employee.joinedDate}</td>
                  <td>{employee.companyName}</td>
                  <td>{employee.designation}</td>
                  <td>{employee.department}</td>
                  <td className="action-btn">
                  <div className="actions">
        <Link to={`/updateemployee/${employee.id}`}>
          <button className="update">
            <FaEdit /> {/* Icon for updating employee */}
          </button>
        </Link>
        <button className="delete" onClick={() => handleDelete(employee.id)}>
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
