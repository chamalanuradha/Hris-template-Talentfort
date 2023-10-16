import React, { useState, useEffect } from 'react';
import Superadminsidebar from '../component/Superadminsidebar';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './Companies.css'
import axios from 'axios';

export default function Companies() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get('http://backend.chalanka.me/companies');
        setSearchResults(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCompanies();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://backend.chalanka.me/companies');
      const { data } = response;

      // Filter the employees whose names start with the search term
      const filteredResults = data.filter((company) => {
        const companyNameLower = company.companyName.toLowerCase();
        const searchTermLower = searchTerm.toLowerCase();
        return companyNameLower.startsWith(searchTermLower);
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
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this company?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://backend.chalanka.me/companies/${id}`);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="main-body">
    <div>
   <Superadminsidebar />
   </div>
   <div className="company">
        <h1>Companies</h1>

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
            <Link className="Addcmp" to="/addcompany">
              Add Company
            </Link>
          </button>
          <table className="table">
            <thead>
              <tr>
                <th>Company ID</th>
                <th>Company Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((company) => (
                <tr className="Dts" key={company.id}>
                  <td>{company.id}</td>
                  <td>{company.companyName}</td>
                  <td className="action-btn">
                  <div className="actions">
        <Link to={`/updatecompany/${company.id}`}>
          <button className="update">
            <FaEdit /> {/* Icon for updating company */}
          </button>
        </Link>
        <button className="delete" onClick={() => handleDelete(company.id)}>
          <FaTrash /> {/* Icon for deleting company */}
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
  )}
