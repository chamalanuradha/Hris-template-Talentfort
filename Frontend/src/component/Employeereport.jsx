import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import { CSVLink } from 'react-csv';
import 'jspdf-autotable';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './Employeereport.css'

export default function Employeereport() {
  const [searchResults, setSearchResults] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [maritalStatuses, setMaritalStatuses] = useState([]);
  const [designations, setDesignation] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedMaritalStatus, setSelectedMaritalStatus] = useState('');
  const [selectedDesignation, setSelectedDesignation] = useState ('');
  const [months, setMonths] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [companyNames, setCompanyNames] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');

   

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get('http://backend.chalanka.me/employees');
        setSearchResults(res.data);
        const departmentSet = new Set();
        const maritalStatusSet = new Set();
        const designationSet = new Set();
        const monthSet = new Set();
        const yearSet = new Set();
        const companySet =new Set();

        res.data.forEach((employee) => {
          const joinedDate = new Date(employee.joinedDate);
          const monthName = joinedDate.toLocaleString('default', { month: 'long' });
          const year = joinedDate.getFullYear().toString();

          departmentSet.add(employee.department);
          maritalStatusSet.add(employee.maritalStatus);
          designationSet.add(employee.designation);
          monthSet.add(monthName);
          yearSet.add(year);
          companySet.add(employee.companyName);
        });

        setDepartments(Array.from(departmentSet));
        setMaritalStatuses(Array.from(maritalStatusSet));
        setDesignation(Array.from(designationSet));
        setCompanyNames(Array.from(companySet));
        const monthsOrder = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        setMonths(Array.from(monthSet).sort((a, b) => {
          return monthsOrder.indexOf(a) - monthsOrder.indexOf(b);
        }));
        setYears(Array.from(yearSet));
         
      } catch (error) {
        console.log(error);
      }
    };
    fetchEmployees();
  }, []);

  const handleFilter = async () => {
    try {
      const response = await axios.get('http://backend.chalanka.me/employees');
      const employees = response.data;

      let filteredResults = employees;

      if (selectedMonth) {
        filteredResults = filteredResults.filter(
          (employee) => new Date(employee.joinedDate).toLocaleString('default', { month: 'long' }) === selectedMonth
        );
      }

      if (selectedYear) {
        filteredResults = filteredResults.filter(
          (employee) => new Date(employee.joinedDate).getFullYear().toString() === selectedYear
        );
      }

      if (selectedDepartment) {
        filteredResults = filteredResults.filter(
          (employee) => employee.department === selectedDepartment
        );
      }

      if (selectedMaritalStatus) {
        filteredResults = filteredResults.filter(
          (employee) => employee.maritalStatus === selectedMaritalStatus
        );
      }
      if(selectedDesignation) {
        filteredResults = filteredResults.filter(
          (employee) => employee.designation === selectedDesignation
        )
      }
      if(selectedCompany) {
        filteredResults = filteredResults.filter(
          (employee) => employee.companyName === selectedCompany
        )
      }

      setSearchResults(filteredResults);
    } catch (error) {
      console.error('Error retrieving employee data:', error);
    }
  };

  const GeneratePDF = async () => {
    const PDF = new jsPDF('portrait', 'px', 'a3');
    PDF.setFontSize(16);

    try {
      const data = searchResults.map((employee) => [
        employee.empNo,
        employee.fullName,
        employee.gender,
        employee.dob,
        employee.maritalStatus,
        employee.currentAddress,
        employee.phone,
        employee.joinedDate,
        employee.designation,
        employee.department,
      ]);
      const headers = [
        'Emp No',
        'Full Name',
        'Gender',
        'DOB',
        'Marital Status',
        'Residence Address',
        'Phone',
        'Joined Date',
        'Designation',
        'Department',
      ];
     

      const customTitle = 'Employees Table';
      const headerMargin = 13; // Set the top margin for the header
      const titleTopMargin = 20; // Set the top margin for the title

      PDF.text(customTitle, 10, titleTopMargin + headerMargin);
      let headtext = '';
      if (selectedDepartment && selectedDesignation && selectedMonth && selectedYear) {
        headtext = `${selectedDepartment}(${selectedDesignation}) - ${selectedYear} / ${selectedMonth}`;
      } 
      else if (selectedDepartment && selectedDesignation && selectedMonth) {
        headtext = `${selectedDepartment}(${selectedDesignation}) - ${selectedMonth}`;
      }
      else if (selectedDepartment && selectedDesignation && selectedYear) {
        headtext = `${selectedDepartment}-${selectedDesignation} / ${selectedYear}`;
      }
      else if (selectedDepartment && selectedMonth && selectedYear) {
        headtext = `${selectedDepartment} - ${selectedMonth}/${selectedYear}`;
      }
      else if (selectedDepartment && selectedMonth) {
        headtext = `${selectedDepartment} - ${selectedMonth}`;
      }
      else if (selectedDepartment && selectedYear) {
        headtext = `${selectedDepartment} - ${selectedYear}`;
      }
      else if (selectedDesignation && selectedMonth && selectedYear) {
        headtext = `${selectedDesignation} - ${selectedMonth}/${selectedYear}`;
      }
      else if (selectedDesignation && selectedMonth) {
        headtext = `${selectedDesignation} - ${selectedMonth}`;
      }
      else if (selectedDesignation && selectedYear) {
        headtext = `${selectedDesignation} - ${selectedYear}`;
      }
      else if (selectedMonth && selectedYear) {
        headtext = `${selectedMonth}/${selectedYear}`;
      }
      else if (selectedDepartment && selectedDesignation) {
        headtext = `${selectedDepartment} - ${selectedDesignation}`;
      }
      else if (selectedMonth) {
        headtext = `${selectedMonth}`;
      }
      else if (selectedYear) {
        headtext = `${selectedYear}`;
      }
      else if (selectedDepartment) {
        headtext = `${selectedDepartment}`;
      }
      else if (selectedDesignation) {
        headtext = `${selectedDesignation}`;
      }
      else {
        headtext = 'All Employees';
      }

      PDF.text(headtext, 15, titleTopMargin + headerMargin + 25);
      PDF.autoTable({
        startY: titleTopMargin + headerMargin + 30, // Adjust startY to include the top margin
        head: [headers],
        body: data,
        margin: { top: headerMargin }, // Set the top margin for the header
      });

      PDF.save('employees.pdf');
    } catch (error) {
      console.error('Error retrieving employee data:', error);
    }
  };
  const handleMonthFilter = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearFilter = (event) => {
    setSelectedYear(event.target.value);
  };
 

  const handleDepartmentFilter = (event) => {
    setSelectedDepartment(event.target.value);
  };

  const handleMaritalStatusFilter = (event) => {
    setSelectedMaritalStatus(event.target.value);
  };
const handleDesignationFilter = (event) => {
  setSelectedDesignation(event.target.value)
}

const handleCompanyFilter = (event) => {
  setSelectedCompany(event.target.value)
}


const prepareCSVData = () => {
  const csvData = searchResults.map((employee) => [
    employee.empNo,
    employee.fullName,
    employee.gender,
    employee.dob,
    employee.maritalStatus,
    employee.currentAddress,
    employee.phone,
    employee.joinedDate,
    employee.designation,
    employee.department,
  ]);
 // Add the header row for the CSV data
 const headers = [
  'Emp No',
  'Full Name',
  'Gender',
  'DOB',
  'Marital Status',
  'Residence Address',
  'Phone',
  'Joined Date',
  'Designation',
  'Department',
];

return [headers, ...csvData];// Concatenate headers with the data rows
};


  return (
    <div className="main-body">
      <div className="report">
        <h1>Employee</h1>
<div className='filter_section'>
<div className="row mb-3 ">
          <div className="col-md-4">
              <label htmlFor="companyFilter">Company:</label>
              <select
                id="companyFilter"
                value={selectedCompany}
                className="form-select"
                onChange={handleCompanyFilter}
                >
                <option value="">All</option>
                {companyNames.map((company) =>
                  <option key={company} value={company}>
                    {company}
                  </option>
                  )}
                  </select>
                  </div>

          <div className="col-md-4">
              <label htmlFor="departmentFilter">Department:</label>
              <select
                id="departmentFilter"
                value={selectedDepartment}
                className="form-select"
                onChange={handleDepartmentFilter}
              >
                <option value="">All</option>
                {departments.map((department) => (
                  <option key={department} value={department}>
                    {department}
                  </option>
                ))}
              </select>
            </div>
              <div className="col-md-4">
              <label htmlFor="designationFilter">Designation:</label>
              <select
                id="designationFilter"
                value={selectedDesignation}
                className="form-select"
                onChange={handleDesignationFilter}
              >
                <option value="">All</option>
                {designations.map((designation) => (
                  <option key={designation} value={designation}>
                    {designation}
                  </option>
                ))}
              </select>
            </div>
            </div>
            <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="maritalStatusFilter">Marital Status:</label>
              <select
                id="maritalStatusFilter"
                value={selectedMaritalStatus}
                className="form-select"
                onChange={handleMaritalStatusFilter}
              >
                <option value="">All </option>
                {maritalStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
        

      
            <div className="col-md-4">
              <div className="month-filter">
                <label htmlFor="monthFilter">Filter by Joined Month:</label>
                <select
                  id="monthFilter"
                  value={selectedMonth}
                  className="form-select"
                  onChange={handleMonthFilter}
                >
                  <option value="">All</option>
                  {months.map((month, index) => (
                    <option key={index} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-md-4">
              <div className="year-filter">
                <label htmlFor="yearFilter">Filter by Joined Year:</label>
                <select
                  id="yearFilter"
                  value={selectedYear}
                  className="form-select"
                  onChange={handleYearFilter}
                >
                  <option value="">All</option>
                  {years.map((year, index) => (
                    <option key={index} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            </div>
        
       

        <button className='filter' onClick={handleFilter}>Apply Filters</button>
</div>
        

        <div>
          <table className="table">
            <thead>
              <tr>
                <th>Emp No</th>
                <th>Full Name</th>
                <th>Gender</th>
                <th>Marital Status</th>
                <th>Residence Address</th>
                <th>Phone</th>
                <th>Joined Date</th>
                <th>Company Name</th>
                <th>Designation</th>
                <th>Department</th>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='repos'>

<div>
  <button className='pdf' onClick={GeneratePDF}>Generate PDF</button>
  </div>
  <div>
  <CSVLink
    data={prepareCSVData()} // Call prepareCSVData to get the formatted data
    filename="employees.csv"
    className="csv"
    target="_blank"
  >
    Genarate CSV
  </CSVLink>
  </div>
     </div>

        
      </div>
      
      </div>
  );
}
