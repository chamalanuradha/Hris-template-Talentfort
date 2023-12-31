import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './Addemployee.css';


export default function AddEmployee() {
  const [companyNames, setCompanyNames] = useState([]);
  const [employee, setEmployee] = useState({
    firstName: '',
    lastName: '',
    title: '',
    maritalStatus: '',
    dob: '',
    nic: '',
    phone: '',
    currentAddress: '',
    country: '',
    companyName: '',
    department: '',
    salary: '',
    gender: '',
    employeeType: '',
    workShift: '',
    designation: '',
    joinedDate: '',
    payGrade: '',
    payType: '',
    empNO: '',


  });



  const handleChange = (e) => {
    setEmployee((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
  
    const requiredFields = [
      'firstName',
      'lastName',
      'title',
      'maritalStatus',
      'dob',
      'nic',
      'phone',
      'currentAddress',
      'country',
      'companyName',
      'department',
      'salary',
      'gender',
      'employeeType',
      'workShift',
      'designation',
      'joinedDate',
      'payGrade',
      'payType',
      'empNo',
    ];
  
    // Check if any of the required fields is empty
    const missingFields = requiredFields.filter(field => !employee[field]);
  
    if (missingFields.length > 0) {
      const missingFieldsList = missingFields.join(', ');
      alert(`Please fill in all required fields: ${missingFieldsList}`);
      return;
    }
  
    try {
      await axios.post('http://backend.chalanka.me/employees', employee);
      alert('Employee added successfully.'); // You can show a success message if needed.
  
      // Navigate to the previous page with a reload
      window.history.back();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    try {
      const fetchCompanies = async () => {
        try {
          const response = await axios.get('http://backend.chalanka.me/companies');
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
    <div className="addemployee">
      <h1>Add Employee</h1>
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
      />
    </div>

<div className=" col-lg-12 mb-1">
  <label htmlFor="currentAddress" className="form-label">Current Address</label>
  <textarea
    className="form-control"
    id="currentAddress"
    name="currentAddress"
    onChange={handleChange}
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
      />
    </div>
    <div className="col-lg-6">
      <label htmlFor="epfNo" className="form-label">EPF No</label>
      <input
        type="text"
        className="form-control"
        id="epfNo"
        name="epfNo"
        onChange={handleChange}
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
        id="workShif"
        name="workShift"
        value="Day Shift"
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
      />
    </div>
</div>
</div>
<div className="buttons ">
  <button type="submit" className="btn btn-primary shadow save-button" onClick={handleClick}>
    Save
  </button>
  <button type="reset" className="btn btn-danger reset-button">
    Reset
  </button>
</div>
      </form>
    </div>
  </div>
  );
}
