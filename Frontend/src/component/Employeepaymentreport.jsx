import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import { CSVLink } from 'react-csv';
import 'jspdf-autotable';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './Employeepaymentreport.css'


export default function Employeepaymentreport() {
  const [searchResults, setSearchResults] = useState([]);
  const [empnos, setEmpnos] = useState([]);
  const [selectedEmployeeNo, setSelectedEmployeeNo] = useState('');
  const [months, setMonths] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [companyNames, setCompanyNames] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axios.get('http://localhost:8080/combinedData');
        setSearchResults(res.data);
        const empnoset = new Set();
        const monthSet = new Set();
        const yearSet = new Set();
        const companyNames = new Set();

        res.data.forEach((payment) => {
          const paymentDate = new Date(payment.date);
          const monthName = paymentDate.toLocaleString('default', { month: 'long' });
          const year = paymentDate.getFullYear().toString();

          empnoset.add(payment.empNo);
          monthSet.add(monthName);
          yearSet.add(year);
          companyNames.add(payment.companyName);
        });

        const sortedEmpnos = Array.from(empnoset).sort((a, b) => {
          // Check if both `a` and `b` are numbers (employee numbers)
          if (!isNaN(a) && !isNaN(b)) {
            return a - b; // Sort numbers numerically
          }
          return a.localeCompare(b); // Sort strings alphabetically
        });

        setEmpnos(sortedEmpnos);
        
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
      const res = await axios.get('http://localhost:8080/combinedData');
      const payments = res.data;

      let filteredResults = payments;

    if (selectedEmployeeNo) {
      filteredResults = filteredResults.filter(
        (payment) => payment.empNo === selectedEmployeeNo
      );
    }

    if (selectedMonth) {
      filteredResults = filteredResults.filter(
        (payment) => payment.monthName === selectedMonth
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
    }catch (error) {
      console.log(error);
    }
    
  };

  const GeneratePDF = () => {
    const PDF = new jsPDF('portrait', 'px', 'a4');
    PDF.setFontSize(14);
  
    try {
      searchResults.forEach((payment, index) => {
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
    
        PDF.text('Employee Pay Slip', start, startY);
  
        PDF.text(`Emp No`, labelX, startY + 2 * lineHeight);
        PDF.text(`: ${payment.empNo}`, valueX, startY + 2 * lineHeight);
  
        PDF.text(`Employee Name`, labelX, startY + 3 * lineHeight);
        PDF.text(`: ${payment.employeeName}`, valueX, startY + 3 * lineHeight);
  
        PDF.text(`Month/Year`, labelX, startY + 4 * lineHeight);
        const date = new Date(payment.date);
        const monthName = date.toLocaleString('default', { month: 'long' });
        const yearMonthText = `${monthName} ${date.getFullYear()}`;
        PDF.text(`: ${yearMonthText}`, valueX, startY + 4 * lineHeight);
  
        PDF.text(`Basic salary (Rs)`, label1X, startY + 7 * lineHeight);
        PDF.text(`( +${payment.salary.toFixed(2)})`, value1X, startY + 7 * lineHeight, { align: 'right' });
  
        PDF.text(`Additions (Rs):`, label1X, startY + 8 * lineHeight);
  
        PDF.text(`Travelling (Daily)`, label2X, startY + 9 * lineHeight);
        PDF.text(`${payment.travellingDaily.toFixed(2)}`, value1X, startY + 9 * lineHeight, { align: 'right' });
        PDF.text(`Farewell`, label2X, startY + 10 * lineHeight);
        PDF.text(`${payment.farewell.toFixed(2)}`, value1X, startY + 10 * lineHeight, { align: 'right', fontSize: 10 });
        PDF.text(`Travelling`, label2X, startY + 11 * lineHeight);
        PDF.text(`${payment.travelling.toFixed(2)}`, value1X, startY + 11 * lineHeight, { align: 'right' });
  
        PDF.text(`( +${payment.additions.toFixed(2)})`, value1X, startY + 12 * lineHeight, { align: 'right' });
  
        PDF.text(`Deductions (Rs):`, label1X, startY + 13 * lineHeight);
        PDF.text(`EPF`, label2X, startY + 14 * lineHeight);
        PDF.text(`${payment.epf8.toFixed(2)}`, value1X, startY + 14 * lineHeight, { align: 'right' });
        PDF.text(`ETF`, label2X, startY + 15 * lineHeight);
        PDF.text(`${payment.etfContribution.toFixed(2)}`, value1X, startY + 15 * lineHeight, { align: 'right' });
        PDF.text(`Farewell`, label2X, startY + 16 * lineHeight);
        PDF.text(`${payment.dfarewell.toFixed(2)}`, value1X, startY + 16 * lineHeight, { align: 'right' });
  
        PDF.text(`( -${payment.deductions.toFixed(2)})`, value1X, startY + 17 * lineHeight, { align: 'right' });
  
        PDF.text(`Net Paid (Rs)`, label1X, startY + 19 * lineHeight);
        PDF.text(`${payment.netpaid.toFixed(2)}`, value1X, startY + 19 * lineHeight, { align: 'right' });
  
        // Add double line under Net Paid value
        PDF.setLineWidth(2);
        PDF.line(valueline, startY + 19.5 * lineHeight, valueline + 55, startY + 19.5 * lineHeight);
        
        // Add single line under Deductions value
        PDF.setLineWidth(1);
        PDF.line(valueline, startY + 18 * lineHeight, valueline + 55, startY + 18 * lineHeight);
      });
  
      PDF.save('Employee_monthly_payment_report.pdf');
    } catch (error) {
      console.error('Error generating pay slip:', error);
    }
  };
  
  
  
  

  const handleEmployeeNoFilter = (event) => {
    setSelectedEmployeeNo(event.target.value);
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

    const csvData = searchResults.map((payment) => ({
      'Emp No': payment.empNo,
      'Employee Name': payment.employeeName,
      'Date': payment.date,
      'Salary': payment.salary,
      'Travelling (Daily)': payment.travellingDaily,
      'Farewell': payment.farewell,
      'Travelling': payment.travelling,
      'EPF': payment.epf8,
      'ETF': payment.etfContribution,
      'Deductions': payment.dfarewell,
      'Net Paid': payment.netpaid,
    }));
  
    return [ ...csvData]; // Concatenate headers with the data rows
  };

  return (
    <div className="main-body">
      <div className="report">
        <h1>Employee Monthly Payment</h1>
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
                  </div>
                  <div className='row mb-3'>
                 <div className="col-md-4">
                <label htmlFor="employeeNoFilter">Employee No:</label>
                <select
                  id="empNo"
                  value={selectedEmployeeNo}
                  className="form-control"
                  onChange={handleEmployeeNoFilter}
                >
                  <option value="">All</option>
                  {empnos.map((empno, index) => (
                    <option key={index} value={empno}>
                      {empno}
                    </option>
                  ))}
                </select>
              
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
    filename="Employee_payment.csv"
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
