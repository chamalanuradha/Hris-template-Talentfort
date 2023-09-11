import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Addcompany.css';
import Superadminsidebar from '../component/Superadminsidebar';


export default function Addcompany() {
  const [companyData, setCompanyData] = useState({
    companyName: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCompanyData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/companies', companyData); // Pass companyData
      navigate('/companies');
    } catch (error) {
      console.log(error);
    }
  };
  const handleReset = (e) => {
    e.preventDefault();
    setCompanyData({
      companyName: '',
    });
  };
  return (
    <div className="main-body">
    <div>
     <Superadminsidebar/>
     </div>
   <div className="addcompany">
     <h1>Add Company</h1>
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
  )
}
