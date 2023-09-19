import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './Employeepaymentreport.css';


export default function Bcardreport() {
  const [searchResults, setSearchResults] = useState([]);
  const [empnames, setEmpnames] = useState([]);
  const [selectedEmployeeName, setSelectedEmployeeName] = useState('');
  const [filteredEmployeeNames, setFilteredEmployeeNames] = useState([]);
  const [typedEmployeeName, setTypedEmployeeName] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get('http://localhost:8081/employees');
        setSearchResults(res.data);
        const empnameSet = new Set();
        res.data.forEach((Employee) => {
          empnameSet.add(Employee.fullName);
        });

        const sortedEmpnames = Array.from(empnameSet).sort((a, b) => {
          if (!isNaN(a) && !isNaN(b)) {
            return a - b;
          }
          return a.localeCompare(b);
        });

        setEmpnames(sortedEmpnames);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEmployees();
  }, []);

  const handleFilter = async () => {
    try {
      const res = await axios.get('http://localhost:8081/employees');
      const Employees = res.data;

      let filteredResults = Employees;

      if (selectedEmployeeName) {
        filteredResults = filteredResults.filter(
          (Employee) => Employee.fullName === selectedEmployeeName
        );
      }
      setSearchResults(filteredResults);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNameFilter = (event) => {
    const typedName = event.target.value;
    setSelectedEmployeeName('');
    setTypedEmployeeName(typedName);

    if (typedName.length >= 1) {
      const filteredNames = empnames.filter((name) =>
        name.toLowerCase().includes(typedName.toLowerCase())
      );
      setFilteredEmployeeNames(filteredNames);
    } else {
      setFilteredEmployeeNames([]);
    }
  };

  const handleSelectedEmployeeName = (name) => {
    setSelectedEmployeeName(name);
    setTypedEmployeeName(name); // Set the typed name to the selected name
    setFilteredEmployeeNames([]); // Clear the filtered list
  };

  const GeneratePDF = () => {
    const PDF = new jsPDF('portrait', 'px', 'a4');
    PDF.setFontSize(14);
  
    try {
      searchResults.forEach((employee, index) => {
        const start = 25;
        const startX = 40;
        const startY = 30;
        const lineHeight = 15;
        const labelX = startX;
        const label1X = startX + 50;
        const label2X = startX + 60;
        const valueX = 160;
        const value1X = 300;
        const valueline = 245;
      
      if (index !== 0) {
        PDF.addPage(); // Add a new page for each payslip, except the first one
      }
      PDF.text('Employee B Card', start, startY);

      PDF.text(`Employee Name`, labelX, startY + 2 * lineHeight);
      PDF.text(`: ${employee.fullName}`, valueX, startY + 2 * lineHeight);

      PDF.text(`Emp No`, labelX, startY + 3 * lineHeight);
      PDF.text(`: ${employee.empNo}`, valueX, startY + 3 * lineHeight);

      PDF.text(`Epf No`, labelX, startY + 4 * lineHeight);
      PDF.text(`: ${employee.epfNo}`, valueX, startY + 4 * lineHeight);

      PDF.text(`Company Name`, labelX, startY + 5 * lineHeight);
      PDF.text(`: ${employee.companyName}`, valueX, startY + 5 * lineHeight);

      PDF.text(`Address`, labelX, startY + 6 * lineHeight);
      PDF.text(`: ${employee.currentAddress}`, valueX, startY + 6 * lineHeight);

      PDF.text(`Gender`, labelX, startY + 7 * lineHeight);
      PDF.text(`: ${employee.gender}`, valueX, startY + 7 * lineHeight);

      PDF.text(`Marital Status`, labelX, startY + 8 * lineHeight);
      PDF.text(`: ${employee.maritalStatus}`, valueX, startY + 8 * lineHeight);

      PDF.text(`Dated of Birth`, labelX, startY + 9 * lineHeight);
      PDF.text(`: ${employee.dob}`, valueX, startY + 9 * lineHeight);

      PDF.text(`NIC`, labelX, startY + 10 * lineHeight);
      PDF.text(`: ${employee.nic}`, valueX, startY + 10 * lineHeight);
      
      PDF.text(`Joined Date`, labelX, startY + 11 * lineHeight);
      PDF.text(`: ${employee.joinedDate}`, valueX, startY + 11 * lineHeight);
    });
  
      PDF.save('Employee_bcard_report.pdf');
    } catch (error) {
      console.error('Error generating b card:', error);
    }
  };


  return (
    <div className="main-body">
      <div className="report">
        <h1>Employee B Card</h1>
        <div className="filter_section">
          <div className="row mb-3">
            <div className="col-md-4">
              <div className="name-filter">
                <label htmlFor="nameFilter">Employee Name:</label>
                <input
                  type="text"
                  id="nameFilter"
                  value={typedEmployeeName}
                  className="form-control"
                  onChange={handleNameFilter}
                  autoComplete="off"
                />
                {typedEmployeeName.length > 0 && (
                  <ul className="autocomplete-list">
                    {filteredEmployeeNames.map((name, index) => (
                      <li
                        key={index}
                        onClick={() => handleSelectedEmployeeName(name)}
                        className={`${selectedEmployeeName === name ? 'selected' : ''}`}
                      >
                        {name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
          <button className="filter" onClick={handleFilter}>
            Apply Filters
          </button>
        </div>

        <div>
        <table className="table">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>Emp No</th>
                <th>EPF No</th>
                <th>Company Name</th>
                <th>Address</th>
                <th>Gender</th>
                <th>Marital Status</th>
                <th>DOB</th>
                <th>NIC</th>
                <th>Joined Date</th>
                
               
                
              </tr>
            </thead>
            <tbody>
              {searchResults.map((employee) => ( 
                <tr key={employee.id}>
                  <td>{employee.id}</td> 
                  <td>{employee.fullName}</td>
                  <td>{employee.empNo}</td>
                  <td>{employee.epfNo}</td>
                  <td>{employee.companyName}</td>
                  <td>{employee.currentAddress}</td>
                  <td>{employee.gender}</td>
                  <td>{employee.maritalStatus}</td>
                  <td>{employee.dob}</td>
                  <td>{employee.nic}</td>
                  <td>{employee.joinedDate}</td>
                 
                
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='repos'>

<div>
  <button className='pdf' onClick={GeneratePDF}>Generate PDF</button>
  </div>
     </div>
      </div>
    </div>
  );
}


