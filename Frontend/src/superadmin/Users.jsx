import React,{ useState, useEffect } from 'react'
import Superadminsidebar from '../component/Superadminsidebar';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import './Users.css'

export default function Users() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:8080/users');
        setSearchResults(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:8080/users');
      const { data } = response;

      // Filter the employees whose names start with the search term
      const filteredResults = data.filter((user) => {
        const userNameLower = user.username.toLowerCase();
        const userRoleLower =user.role.toLowerCase();
        const searchTermLower = searchTerm.toLowerCase();
        return userNameLower.startsWith(searchTermLower)|| userRoleLower.startsWith(searchTermLower);
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
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8080/users/${id}`);
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
   <div className="users">
        <h1>Users</h1>

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
            <Link className="Adduser" to="/adduser">
              Add User
            </Link>
          </button>
          <table className="table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>User Name</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((user) => (
                <tr className="Dts" key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.role}</td>
                  <td className="action-btn">
                  <div className="actions">
        <Link to={`/updateuser/${user.id}`}>
          <button className="update">
            <FaEdit /> {/* Icon for updating user */}
          </button>
        </Link>
        <button className="delete" onClick={() => handleDelete(user.id)}>
          <FaTrash /> {/* Icon for deleting user */}
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
