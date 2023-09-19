import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './Updatecompany.css';
import Superadminsidebar from '../component/Superadminsidebar';

export default function Updatecompany() {
  const [companyData, setCompanyData] = useState({
    companyName: '',
  });

  const navigate = useNavigate();
  const location = useLocation();

  const companyId = location.pathname.split('/')[2];

  useEffect(() => {
    const fetchLoan = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/companies/${companyId}`);
        const {companyName} = response.data;
        setCompanyData({
          companyName,
         
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchLoan();
  }, [companyId]);


  const handleChange = async (e) => {
    const { name, value } = e.target;

    setCompanyData((preCompanyData) => ({
      ...preCompanyData,
      [name]: value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8081/companies/${companyId}`, companyData); // Pass companyData
      navigate('/companies');
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div className="main-body">
    <div>
     <Superadminsidebar/>
     </div>
   <div className="addcompany">
     <h1>Update Company</h1>
     <form>
     <div className="mb-3">
            <label htmlFor="companyName" className="form-label">
              Company Name
            </label>
            <input
  className="form-control"
  type="text"
  id="companyName"
  name="companyName"
  value={companyData.companyName} // Bind the value to the state
  onChange={handleChange}
/>
          </div>
          <div className="buttons ">
<button type="submit" className="btn btn-primary update-button" onClick={handleClick}>
          Update
        </button>
</div>
     </form>
   </div>
   </div>
  )
}
