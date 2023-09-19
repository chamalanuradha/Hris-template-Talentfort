import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import { CSVLink } from 'react-csv';
import 'jspdf-autotable';

import './Paymentreport.css'

export default function Paymentreport() {
  const [searchResults, setSearchResults] = useState([]);
  const [months, setMonths] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [companyNames, setCompanyNames] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axios.get('http://localhost:8081/combinedData');
        setSearchResults(res.data);
        const monthSet = new Set();
        const yearSet = new Set();
        const companyNames = new Set();

        res.data.forEach((payment) => {
          const paymentDate = new Date(payment.date);
          const monthName = paymentDate.toLocaleString('default', { month: 'long' });
          const year = paymentDate.getFullYear().toString();
        
          monthSet.add(monthName);
          yearSet.add(year);
          companyNames.add(payment.companyName);
        });

        const monthsOrder = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        setMonths(Array.from(monthSet).sort((a, b) => {
          return monthsOrder.indexOf(a) - monthsOrder.indexOf(b);
        }));
        setYears(Array.from(yearSet));
        setCompanyNames(Array.from(companyNames));
      } catch (error) {
        console.log(error);
      }
    };

    fetchPayments();
  }, []);




  const handleFilter = async () => {
    try {
      const res = await axios.get('http://localhost:8081/combinedData');
      const payments = res.data;

      let filteredResults = payments;

      if (selectedMonth) {
        filteredResults = filteredResults.filter(
          (payment) => new Date(payment.date).toLocaleString('default', { month: 'long' })  === selectedMonth
        );
      }

      if (selectedYear) {
        filteredResults = filteredResults.filter(
          (payment) => new Date(payment.date).getFullYear().toString() === selectedYear
        );
      }
      if (selectedCompany) {
        filteredResults = filteredResults.filter(
          (payment) => payment.companyName === selectedCompany
        );
      }

      setSearchResults(filteredResults);
    } catch (error) {
      console.log(error);
    }
  };

  const GeneratePDF = async () => {
    const PDF = new jsPDF('portrait', 'px', 'a4');
    PDF.setFontSize(18);
  
    try {
      const headers = [
        { content: 'Emp No', styles: { halign: 'left' } },
        { content: 'Employee Name', styles: { halign: 'center' } },
        { content: 'Attendance', styles: { halign: 'left' } },
        { content: 'Date', styles: { halign: 'left' } },
        { content: 'Salary(Rs)', styles: { halign: 'center' } },
        { content: 'Additions(Rs)', styles: { halign: 'center' } },
        { content: 'Deductions(Rs)', styles: { halign: 'center' } },
        { content: 'Net Paid(Rs)', styles: { halign: 'center' } },
      ];
      const data = searchResults.map((payment) => [
        payment.empNo,
        { content: payment.employeeName, styles: { halign: 'left' } },
        payment.attendingDays,
        payment.date,
        { content: payment.salary.toFixed(2), styles: { halign: 'center' } },
        { content: payment.additions.toFixed(2), styles: { halign: 'center' } },
        { content: payment.deductions.toFixed(2), styles: { halign: 'center' } },
        { content: payment.netpaid.toFixed(2), styles: { halign: 'center' } },
      ]);
  
      const salaryTotal = searchResults.reduce(
        (total, payment) => total + payment.salary,
        0
      );
      const netPaidTotal = searchResults.reduce(
        (total, payment) => total + payment.netpaid,
        0
      );
      const additionsTotal = searchResults.reduce(
        (total, payment) => total + payment.additions,
        0
      );
      const deductionsTotal = searchResults.reduce(
        (total, payment) => total + payment.deductions,
        0
      );
  
      const totalsRow = [
        '', // Emp No
        '', // Employee Name
        '', // Attendance
        '', // Date
        '', // Salary(Rs)
        '', // Additions(Rs)
        '', // Deductions(Rs)
        '', // Net Paid(Rs)
      ];
  
      const finalTotalsRow = [
        '', // Emp No
        { content: 'Total', styles: { fontStyle: 'bold', halign: 'center', fontSize: 10 } }, // Employee Name
        '', // Attendance
        '', // Date
        { content: salaryTotal.toFixed(2), styles: { fontStyle: 'bold', halign: 'center', fontSize: 10 } }, // Salary(Rs)
        { content: additionsTotal.toFixed(2), styles: { fontStyle: 'bold', halign: 'center', fontSize: 10 } }, // Additions(Rs)
        { content: deductionsTotal.toFixed(2), styles: { fontStyle: 'bold', halign: 'center', fontSize: 10 } }, // Deductions(Rs)
        { content: netPaidTotal.toFixed(2), styles: { fontStyle: 'bold', halign: 'center', fontSize: 10 } }, // Net Paid(Rs)
      ];
  
      data.push(totalsRow, finalTotalsRow);
  
      const customTitle = 'Payments Table';
      const headerMargin = 13;
      const titleTopMargin = 20;
  
      PDF.text(customTitle, 10, titleTopMargin + headerMargin);
  
      let monthYearText = '';
    if (selectedMonth && selectedYear) {
      monthYearText = `${selectedYear}/${selectedMonth}`;
    } else if (selectedMonth) {
      monthYearText = `${selectedMonth}`;
    } else if (selectedYear) {
      monthYearText = `${selectedYear}`;
    } else {
      monthYearText = 'All Payments';
    } // Change the text when both selectedMonth and selectedYear are empty
  
      PDF.text(monthYearText, 15, titleTopMargin + headerMargin + 25);
  
      PDF.autoTable({
        startY: titleTopMargin + headerMargin + 30,
        head: [headers],
        body: data,
        margin: { top: headerMargin },
      });
  
      PDF.save('Payments.pdf');
    } catch (error) {
      console.error('Error retrieving payment data:', error);
    }
  };
  
  
  
  
  
  
  
  
  const handleMonthFilter = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearFilter = (event) => {
    setSelectedYear(event.target.value);
  };
  const handleCompanyFilter = (event) => {
    setSelectedCompany(event.target.value);
  }

  const prepareCSVData = () => {
    const salaryTotal = searchResults.reduce((total, payment) => total + payment.salary, 0);
    const netPaidTotal = searchResults.reduce((total, payment) => total + payment.netpaid, 0);
    const additionsTotal = searchResults.reduce((total, payment) => total + payment.additions, 0);
    const deductionsTotal = searchResults.reduce((total, payment) => total + payment.deductions, 0);

    const headers = [
      'Emp No',
      'Full Name',
      'Company Name',
      'Attendence',
      'Date',
      'Salary',
      'Additions',
      'Deductions',
      'Netpaid',
    ];

    const csvData = searchResults.map((payment) => [
    payment.empNo,
    payment.employeeName,
    payment.companyName,
    payment.attendingDays,
    payment.date,
     payment.salary,
     payment.additions,
     payment.deductions,
     payment.netpaid,
  ]);
  const totalsRow = [
    '', // Emp No
    'Total', // Employee Name
    '', // Attendance
    '', // Issue Date
    salaryTotal.toFixed(2), // Basic Salary
    additionsTotal.toFixed(2), // Additions
    deductionsTotal.toFixed(2), // Deductions
    netPaidTotal.toFixed(2), // Net Paid
  ];

  const emptyRow  =[
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',

  ]
  return [headers,...csvData,emptyRow,totalsRow];
}
  return (
    <div className="main-body">
      <div className="report">
        <h1>Monthly Payment</h1>
        <div className="filter_section">
          <div className="row mb-3">
            <div className="col-md-4">
              <div className="company-filter">
                <label htmlFor="companyFilter">Filter by Company:</label>
                <select
                  id="companyFilter"
                  value={selectedCompany}
                  className="form-select"
                  onChange={handleCompanyFilter}
                  >
                  <option value="">All</option>
                  {companyNames.map((company, index) =>(
                    <option key={index} value={company}>
                      {company}
                    </option>
                  ))}
                  </select>
                  </div>
                  </div>
              
            <div className="col-md-4">
              <div className="month-filter">
                <label htmlFor="monthFilter">Filter by Month:</label>
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
                <label htmlFor="yearFilter">Filter by Year:</label>
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

          <button className="filter" onClick={handleFilter}>
            Apply Filters
          </button>
        </div>

        <div>
          <table className="table">
            <thead>
              <tr>
                <th>Emp No</th>
                <th>Employee Name</th>
                <th>Company Name</th>
                <th>Attendance</th>
                <th>Issue Date</th>
                <th>Basic Salary</th>
                <th>Additions</th>
                <th>Deductions</th>
                <th>Net Paid</th>
                
              </tr>
            </thead>
            <tbody>
              {searchResults.map((payment) => (
                
                <tr key={payment.id}>
                  <td>{payment.empNo}</td>
                  <td>{payment.employeeName}</td>
                  <td>{payment.companyName}</td>
                  <td>{payment.attendingDays}</td>
                  <td>{payment.date}</td>
                  <td>{payment.salary}</td>
                  <td>{payment.additions}</td>
                  <td>{payment.deductions}</td>
                  <td>{payment.netpaid}</td>
                  
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
    filename="payments.csv"
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
