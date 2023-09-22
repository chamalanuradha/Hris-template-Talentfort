import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import { CSVLink } from 'react-csv';
import 'jspdf-autotable';
import './Bankslip.css'



export default function Payments() {
  const [months, setMonths] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [companyNames, setCompanyNames] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axios.get('http://localhost:8080/combinedData');
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
      const res = await axios.get('http://localhost:8080/combinedData');
      const payments = res.data;

      let filteredResults = payments;

   

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


  // const prepareCSVData = () => {
  //   const csvData = searchResults.map((payment) =>
  //     [
  //       "0000",
  //       payment.bankNo,
  //       payment.branchNo,
  //       payment.accountNo,
  //       payment.accountName,
  //       '23',
  //       '00',
  //       '0',
  //       '000000',
  //       payment.salary,
  //       'SLR',
  //       '7010',
  //       '038',
  //       '000014556622',
  //       'abc Company',
  //       'BOC boralla',
  //       payment.date,
  //       '000000'
  //     ].join('')
  //   );
  
  //   // Join all the data lines into a single string with line breaks
  //   const csvContent = csvData.join('\n');
  
  //   // Add headers if needed
  //   const csvWithHeaders = `${csvContent}`;
  
  //   return csvWithHeaders; // or csvContent if you don't need headers
  // };
  


  const GeneratePDF = () => {
    const doc = new jsPDF();
    const starty = 10;
  
    try {
      // Data
      const data = searchResults.map((payment) => [
        payment.bankNo,
        payment.branchNo,
        payment.accountNo,
        payment.accountName,
        payment.salary,
        payment.date,
      ]);
  
      // Headers
      const headers = [
        'Bank No',
        'Branch No',
        'Account No',
        'Account Name',
        'Salary',
        'Date',
      ];
  
      let monthYearText = '';
      if (selectedMonth && selectedYear) {
        monthYearText = `Month/Year: ${selectedMonth}/${selectedYear}`;
      } else if (selectedMonth) {
        monthYearText = `Month: ${selectedMonth}`;
      } else if (selectedYear) {
        monthYearText = `Year: ${selectedYear}`;
      } else {
        monthYearText = 'All Payments';
      }
      doc.text(monthYearText, 12, 19);
  
      doc.autoTable({
        startY: starty + 30,
        head: [headers], // Pass the headers array here
        body: data,
        headStyles: {
          textColor: [255, 255, 255],
        },
        didDrawCell: (data) => {},
      });
  
      // Save the PDF
      doc.save('bankslip.pdf');
    } catch (error) {
      console.error('error', error);
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
 
  return (
    <div className="main-body">
      <div className="report">
        <h1>BankSlip</h1>
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
                    {companyNames.map((company, index) =>
                      <option key={index} value={company}>
                        {company}
                      </option>
                      )}
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
                <th >Emp No</th>
                <th>Account Name</th>
                <th >Account No</th>
                <th >Bank No</th>
                <th >Branch No</th>
                <th>Issue Date</th>
                <th >Attendence</th>
                <th >Net Paid</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.empNo}</td>
                  <td>{payment.accountName}</td>
                  <td>{payment.accountNo}</td>
                  <td>{payment.bankNo}</td>
                  <td>{payment.branchNo}</td>
                  <td>{payment.date}</td>
                  <td>{payment.attendingDays}</td>
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
 
  </div>



  </div>
      </div>
    </div>
  );
}
