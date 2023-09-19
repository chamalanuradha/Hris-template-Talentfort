import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './Updateemployee.css';


export default function UpdateEmployee() {
  const [companyNames, setCompanyNames] = useState([]);
  const [employee, setEmployee] = useState({
    firstName: '',
    lastName: '',
    title: '',
    fullName:'',
    maritalStatus: '',
    dob: '',
    nic: '',
    phone: '',
    currentAddress: '',
    country: '',
    companyName: '',
    department: '',
    zipCode: '',
    gender: '',
    employeeType: '',
    workShift: '',
    designation: '',
    joinedDate: '',
    payGrade: '',
    payType: '',
    empNo:'',
    epfNo:'',

  });
  const location = useLocation();

  const id = location.pathname.split('/')[2];

  const handleChange = (e) => {
    setEmployee((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8081/employees/${id}`, employee);
      alert('Employee updated successfully.'); // You can show a success message if needed.
        
        // Navigate to the previous page with a reload
        window.history.back();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/employees/${id}`);
        setEmployee(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEmployee();
    }, [id]);
    useEffect(() => {
      try {
        const fetchCompanies = async () => {
          try {
            const response = await axios.get('http://localhost:8081/companies');
            const companies = response.data;
            const companyNames = companies.map(company => company.companyName); // Using 'companyName' property from API response
            setCompanyNames(companyNames);
          } catch (error) {
            console.error('Error fetching companies:', error);
          }
        };
        fetchCompanies();
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    }, []);

  return (
    <div className="main-body">
    <div className="updateemployee">
      <h1>Update Employee</h1>
      <form>
 <div className='personal_details col-lg-10'>
  <h3>Personal Details</h3>     
<div className='row'>
<div className="col-lg-6">
  <label htmlFor="firstName" className="form-label">
    First Name
  </label>
  <input
    type="text"
    className="form-control"
    id="firstName"
    name="firstName"
    onChange={handleChange}
    value={employee.firstName}
    required
  />
</div>
  <div className="col-lg-6">
    <div className="mb-1">
      <label htmlFor="lastName" className="form-label">
        Last Name
      </label>
      <input
        type="text"
        className="form-control"
        id="lastName"
        name="lastName"
        value={employee.lastName}
        onChange={handleChange}
      />
    </div>
  </div>
</div>
<div className='row'>
<div className="col-lg-6 mb-1">
  <label htmlFor="title" className="form-label">
    Title       
  </label>
  <select
    className="form-control"
    id="title"
    name="title"
    onChange={handleChange}
    value={employee.title}
  >
    <option value="">Select Title</option>
    <option value="Mr.">Mr.</option>
    <option value="Ms.">Ms.</option>
    <option value="Mrs.">Mrs.</option>
  </select>
</div>
<div className="col-lg-6">
    <div className="mb-1">
      <label htmlFor="fullName" className="form-label">
        Name With Initial
      </label>
      <input
        type="text"
        className="form-control"
        id="fullName"
        name="fullName"
        onChange={handleChange}
        value={employee.fullName}
      />
    </div>
    </div>

</div>


<div className='row mb-1'>

<div className=" col-lg-6">
        <div className='marital_full'>
        <label className="form-label">Marital Status</label>
        <div className='marital_cat'>
  <div className="form-check">
    <input
      className="form-check-input"
      type="radio"
      id="maritalStatus"
      value="Unmarried"
      name="maritalStatus"
      onChange={handleChange}
      checked={employee.maritalStatus === 'Unmarried'}
      
    />
    <label className="form-check-label" htmlFor="maritalStatus">
      Unmarried
    </label>
  </div>
  <div className="form-check">
    <input
      className="form-check-input"
      type="radio"
      id="maritalStatus"
      name="maritalStatus"
      value="Married"
      onChange={handleChange}
      checked={employee.maritalStatus === 'Married'}
    />
    <label className="form-check-label" htmlFor="maritalStatus">
      Married
    </label>
  </div>
         </div> 
        </div>
 
</div>


<div className=" col-lg-6">
  <div className='gender_full'>
  <label className="form-label">Gender</label>
  <div className='gender_cat'>
  <div className="form-check">
    <input
      className="form-check-input"
      type="radio"
      id="gender"
      name="gender"
      value="Male"
      onChange={handleChange}
      checked={employee.gender === 'Male'}
    />
    <label className="form-check-label" htmlFor="gender">
      Male
    </label>
  </div>
  <div className="form-check">
    <input
      className="form-check-input"
      type="radio"
      id="gender"
      name="gender"
      value="Female"
      onChange={handleChange}
      checked ={employee.gender === 'Female'}
    />
    <label className="form-check-label" htmlFor="gender">
      Female
    </label>
  </div>
  </div>
  
  </div>
  
</div>

</div>

        
<div className='row mb-1'>
<div className="col-lg-6">
  <label htmlFor="dob" className="form-label">
    Date of Birth
  </label>
  <input
    type="date"
    className="form-control"
    id="dob"
    name="dob"
    onChange={handleChange}
    value={employee.dob}
  />
</div>

<div className="col-lg-6">
  <label htmlFor="nic" className="form-label">
    NIC Number
  </label>
  <input
    type="text"
    className="form-control"
    id="nic"
    name="nic"
    onChange={handleChange}
    value={employee.nic}
  />
</div>

</div>
<div className="col-lg-12 mb-1">
      <label htmlFor="phone" className="form-label">Phone Number</label>
      <input
        type="tel"
        className="form-control"
        id="phone"
        name="phone"
        onChange={handleChange}
        value={employee.phone}
      />
    </div>

<div className=" col-lg-12 mb-1">
  <label htmlFor="currentAddress" className="form-label">Current Address</label>
  <textarea
    className="form-control"
    id="currentAddress"
    name="currentAddress"
    onChange={handleChange}
    value={employee.currentAddress}
  ></textarea>
</div>


       

<div className='row mb-1'>
<div className="col-lg-6">
  <label htmlFor="country" className="form-label">
    Country
  </label>
  <select
    className="form-control"
    id="country"
    name="country"
    onChange={handleChange}
    value={employee.country}
  >
    <option value="">Select Country</option>
    <option value="Bangladesh">Bangladesh</option>
    <option value="Bhutan">Bhutan</option>
    <option value="India">India</option>
    <option value="Maldives">Maldives</option>
    <option value="Nepal">Nepal</option>
    <option value="Pakistan">Pakistan</option>
    <option value="Sri Lanka">Sri Lanka</option>
  </select>
</div>
<div className="col-lg-6">
      <label htmlFor="zipCode" className="form-label">ZIP Code</label>
      <input
        type="text"
        className="form-control"
        id="zipCode"
        name="zipCode"
        onChange={handleChange}
        value={employee.zipCode}
      />
    </div>
</div>
</div>

<div className='company_details col-lg-10'>
<h3>Company Details</h3>
<div className="col-lg-12">
  <label htmlFor="companyName" className="form-label">
    Company Name
  </label>
  <select
    className="form-control"
    id="companyName"
    name="companyName"
    onChange={handleChange}
    value={employee.companyName}
  >
    <option value="">Select Company</option>
    {companyNames.map((companyName, index) => (
      <option key={index} value={companyName}>
        {companyName}
      </option>
    ))}
  </select>
</div>
<div className='row mb-1'>
<div className="col-lg-6">
      <label htmlFor="empNo" className="form-label">Emp No</label>
      <input
        type="text"
        className="form-control"
        id="empNo"
        name="empNo"
        onChange={handleChange}
        value={employee.empNo}
        readOnly
      />
    </div>
    <div className="col-lg-6">
      <label htmlFor="epfNo" className="form-label">Epf No</label>
      <input
        type="text"
        className="form-control"
        id="epfNo"
        name="epfNo"
        onChange={handleChange}
        value={employee.epfNo}
        readOnly
      />
    </div>
</div>

<div className='row mb-1'>
<div className="col-lg-6">
          <label htmlFor="department" className="form-label">
            Department
          </label>
          <select
            className="form-control"
            id="department"
            name="department"
            onChange={handleChange}
            value={employee.department}
          >
            <option value="">Select Department</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option> 
            <option value="IT">IT</option>
            <option value="Marketing">Marketing</option>
            <option value="Manufacture">Manufacture</option>
            <option value="Sales">Sales</option>
            <option value="Operation">Operation</option>

          </select>
        </div>
        <div className="col-lg-6">
  <label htmlFor="designation" className="form-label">
    Designation
  </label>
  <select
    className="form-control"
    id="designation"
    name="designation"
    onChange={handleChange}
    value={employee.designation}
  >
    <option value="">Select Designation</option>
    <option value="Manager">Manager</option>
    <option value="Supervisor">Supervisor</option>
    <option value="Engineer">Engineer</option>
    <option value="Analyst">Analyst</option>
    <option value="Assistant">Assistant</option>
    <option value="Coordinator">Coordinator</option>
    <option value="Specialist">Specialist</option>
    <option value="Officer">Officer</option>
  </select>
</div>
</div>


<div className="col-lg-6 mb-1">
  <label htmlFor="joinedDate" className="form-label">
    Joined Date
  </label>
  <input
    type="date"
    className="form-control"
    id="joinedDate"
    name="joinedDate"
    onChange={handleChange}
    value={employee.joinedDate}
  />
</div>






<div className='row mb-1'>
<div className="col-lg-6">
  <div className='employeetype_full'>
  <label className="form-label">Employee Type</label>
  <div className="employeetype_cat">
  <div className="form-check">
  <input
    className="form-check-input"
    type="radio"
    id="employeeType"
    name="employeeType"
    value="FullTime"
    onChange={handleChange}
    checked={employee.employeeType === "FullTime"}
  />
  <label className="form-check-label" htmlFor="employeeType">
    Full-Time
  </label>
</div>
<div className="form-check">
  <input
    className="form-check-input"
    type="radio"
    id="employeeType"
    name="employeeType"
    value="PartTime"
    onChange={handleChange}
    checked={employee.employeeType === "PartTime"}
  />
  <label className="form-check-label" htmlFor="employeeType">
    Part-Time
  </label>
</div>
</div>
</div>
</div>
<div className="col-lg-6">
  <div className='workshift_full'>
  <label className="form-label">Work Shift</label>
  <div className="workshift_cat">
    <div className="form-check">
      <input
        className="form-check-input"
        type="radio"
        id="workShift"
        name="workShift"
        value="Day Shift"
        checked={employee.workShift === "Day Shift"}
        onChange={handleChange}
        
      />
      <label className="form-check-label" htmlFor="workShift">
        Day Shift
      </label>
    </div>
    <div className="form-check">
      <input
        className="form-check-input"
        type="radio"
        id="workShift"
        name="workShift"
        value="Night Shift"
        onChange={handleChange}
        checked={employee.workShift === "Night Shift"}
      />
      <label className="form-check-label" htmlFor="workShift">
        Night Shift
      </label>
    </div>
  </div>
  </div>  
</div>

</div>

<div className="row mb-1">
  
<div className="col-lg-6">
  <div className="paygrade_full">
    <label className="form-label">Pay Grade</label>
    <div className="paygrade_cat">
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="payGrade"
          id="hourly"
          value="Hourly"
          onChange={handleChange}
          checked={employee.payGrade === "Hourly"}
        />
        <label className="form-check-label" htmlFor="hourly">
          Hourly
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="payGrade"
          id="salary"
          value="Salary"
          onChange={handleChange}
          checked={employee.payGrade === "Salary"}
        />
        <label className="form-check-label" htmlFor="salary">
          Salary
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="payGrade"
          id="commission"
          value="Commission"
          onChange={handleChange}
          checked={employee.payGrade === "Commission"}
        />
        <label className="form-check-label" htmlFor="commission">
          Commission
        </label>
      </div>
    </div>
  </div>
</div>

  
<div className="col-lg-6">
  <div className="paytype_full">
    <label className="form-label">Pay Type</label>
    <div className="paytype_cat">
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="payType"
          id="bank"
          value="Bank"
          onChange={handleChange}
          checked={employee.payType === "Bank"}
        />
        <label className="form-check-label" htmlFor="bank">
          Bank
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="payType"
          id="cash"
          value="Cash"
          onChange={handleChange}
          checked={employee.payType === "Cash"}
        />
        <label className="form-check-label" htmlFor="cash">
          Cash
        </label>
      </div>
    </div>
  </div>
</div>
</div>
</div>
<div className='company_details col-lg-10'>
<h3>Bank Details</h3>
<div className='row mb-1'>
<div className="col-lg-6">
      <label htmlFor="accountName" className="form-label">Account Name</label>
      <input
        type="text"
        className="form-control"
        id="accountName"
        name="accountName"
        onChange={handleChange}
        value={employee.accountName}
      />
    </div>

<div className="col-lg-6">
      <label htmlFor="accountNo" className="form-label">Account No</label>
      <input
        type="text"
        className="form-control"
        id="accountNo"
        name="accountNo"
        onChange={handleChange}
        value={employee.accountNo}
      />
    </div>
</div>
<div className='row mb-1'>
<div className="col-lg-6">
      <label htmlFor="bankName" className="form-label">Bank Name</label>
      <input
        type="text"
        className="form-control"
        id="bankName"
        name="bankName"
        onChange={handleChange}
        value={employee.bankName}
      />
    </div>
        <div className="col-lg-6">
      <label htmlFor="bankNo" className="form-label">Bank No</label>
      <input
        type="text"
        className="form-control"
        id="bankNo"
        name="bankNo"
        onChange={handleChange}
        value={employee.bankNo}
      />
    </div>
</div>
<div className='row mb-1'>
<div className="col-lg-6">
      <label htmlFor="branchName" className="form-label">Branch Name</label>
      <input
        type="text"
        className="form-control"
        id="branchName"
        name="branchName"
        onChange={handleChange}
        value={employee.branchName}
      />
    </div>
        <div className="col-lg-6">
      <label htmlFor="branchNo" className="form-label">Branch No</label>
      <input
        type="text"
        className="form-control"
        id="branchNo"
        name="branchNo"
        onChange={handleChange}
        value={employee.branchNo}
      />
    </div>
</div>
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
