import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import { CSVLink } from 'react-csv';
import 'jspdf-autotable';
import './Employeecformreport.css'



export default function Employeecformreport() {
  const [searchResults, setSearchResults] = useState([]);
  const [months, setMonths] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [companyNames, setCompanyNames] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');

  const [bankName, setBankName] = useState('');
  const [branchNo, setBranchNo] = useState('');
  const [chequeNo, setChequeNo] = useState('');
  const [contributions, setContributions] = useState('');
  const [surcharges, setSurcharges] = useState('');
  const [totalRemittence, setTotalRemittence] = useState('');
  

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axios.get('http://backend.chalanka.me/combinedData');
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
      const res = await axios.get('http://backend.chalanka.me/combinedData');
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
  const GeneratePDF = () => {
    const doc = new jsPDF();
    const startx = 5;
    const starty = 10;
  
   
    try{
      const headers = [
        [
          { content: 'Employee Name', styles: { halign: 'center', fontSize: 10 } },
          { content: 'NIC', styles: { halign: 'center', fontSize: 10 } },
          { content: 'EPF No', styles: { halign: 'center', fontSize: 10 } },
          {
            content: 'Contribution',
            colSpan: 3,
            styles: { halign: 'center', fontSize: 10 },
          },
          { content: 'Basic Salary', styles: { halign: 'center', fontSize: 10 } },
        ],
        [
          '',
          '',
          '',
          { content: 'Total', styles: { fontStyle: 'bold', halign: 'center', fontSize: 10 } },
          { content: 'Employer', styles: { fontStyle: 'bold', halign: 'center', fontSize: 10 } },
          { content: 'Employee', styles: { fontStyle: 'bold', halign: 'center', fontSize: 10 } },
          '',
        ],
      ];
      // Data
      const data = searchResults.map((payment) => [
        {content: payment.employeeName,styles: { halign: 'center' } },
        {content: payment.nic,styles: { halign: 'center' } },
        {content: payment.epfNo,styles: { halign: 'center' } },
        {content: payment.contributionTotal,styles: { halign: 'center' } },
        {content: payment.epf8,styles: { halign: 'center' } },
        {content: payment.etfContribution,styles: { halign: 'center' } },
        {content: payment.salary,styles: { halign: 'center' } },
      ]);

      const Total = searchResults.reduce(
        (total, payment) => total + payment.contributionTotal,
        0
      );
       const totalepf8 = searchResults.reduce(
        (total, payment) => total + payment.epf8,
        0
       );
       const totaletfContribution = searchResults.reduce(
        (total, payment) => total + payment.etfContribution,
        0
       )


      
      const totalsRow = [
       
        '', // Employee Name
        '',//NIC
        '', // Epf No
        '', // total
        '', // Employee
        '', // Employer
        '', // Salary(Rs)

      ];
      const finalTotalsRow = [
        '', // Emp Name
        { content: 'Total', styles: { fontStyle: 'bold', halign: 'center', fontSize: 10 } }, // Employee Name
        '', // Epf No
        { content: Total.toFixed(2), styles: { fontStyle: 'bold',halign: 'center',  fontSize: 10 } }, // Salary(Rs)
        { content: totalepf8.toFixed(2), styles: { fontStyle: 'bold',halign: 'center',  fontSize: 10 } },// 
        { content: totaletfContribution.toFixed(2), styles: { fontStyle: 'bold',halign: 'center',  fontSize: 10 } },//
      ];
     
 
      data.push(totalsRow, finalTotalsRow);




      doc.text('Employee C Form', startx, starty);
      doc.text(`Bank Name: ${bankName}`, 12, 26);
      doc.text(`Branch No: ${branchNo}`, 12, 33);
      doc.text(`Cheque No: ${chequeNo}`, 12, 40);
      doc.text(`Contributions: `, 12, 53);
      doc.text(`${contributions}.00`, 185, 53, { align: 'right' });
      doc.text(`Surcharges: `, 12, 60);
      doc.text(`${surcharges}.00`, 185, 60, { align: 'right' });
      doc.text(`Total Remittence: `, 12, 67);
      doc.text(`${totalRemittence}.00`, 185, 67, { align: 'right' });
      let monthYearText = '';
      if (selectedMonth && selectedYear) {
        monthYearText = `Month/Year :${selectedMonth}/${selectedYear}`;
      } else if (selectedMonth) {
        monthYearText = `Month :${selectedMonth}`;
      } else if (selectedYear) {
        monthYearText = `Year :${selectedYear}`;
      } else {
        monthYearText = 'All Payments';
      }
          doc.text(monthYearText, 12, 19);
  
        

    
      doc.autoTable({
        startY: starty + 70,
        head: headers,
        body: data,
          headStyles: {
            textColor: [255, 255, 255],
            halign: 'center',
            valign: 'middle',
          },
          didDrawCell: (data) => {},
      });

      const signatureText = "Signature : ";
  const signatureX = 12;
  const signatureY = doc.autoTable.previous.finalY + 20;
  doc.text(signatureText, signatureX, signatureY);
    
      // Save the PDF
      doc.save('employee_cform_report.pdf');
    }
    catch(error){
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

  const saveDataToDatabase = async () => {
    const confirmDelete = window.confirm('Are you sure you Save  this data ?');
    if (confirmDelete) {
      try {
        const response = await axios.post('http://backend.chalanka.me/cform', {
          bankName,
          branchNo,
          chequeNo,
          contributions,
          surcharges,
          totalRemittence,
        });
      
        console.log('Data saved successfully:', response.data);
        window.alert('Data saved successfully!');
        // Optionally, you can show a success message or perform other actions here.
      } catch (error) {
        console.error('Error saving data:', error);
        // Optionally, you can show an error message or perform other actions here.
      }
    }
  };

  const prepareCSVData = () => {


    const csvData = searchResults.map((payment) => [
      payment.nic,
      payment.employeeName,
       payment.epfNo,
       payment.contributionTotal,
       payment.epf8,
       payment.etfContribution,
       payment.salary,
    ]);
     const headers = [
      'NIC',
      'Emp Name',
      'EPF No',
      'Contribution',
      'EPF',
      'ETF',
      'salary',
      
    ];
    
    return [headers, ...csvData] // Concatenate headers with the data rows
  };


  return (
    <div className="main-body">
      <div className="report">
        <h1>Employee C Form</h1>
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
<div>
<div className='row'>
        <div className="col-lg-4 mb-3">
  <label htmlFor="contributions" className="form-label">
    Contributions
  </label>
  <input
    type="text"
    className="form-control"
    id="contributions"
    name="contributions"
    onChange={(e) => setContributions(e.target.value)}
    required
  />
</div>
<div className="col-lg-4 mb-3">
  <label htmlFor="surcharges" className="form-label">
    Surcharges
  </label>
  <input
    type="text"
    className="form-control"
    id="surcharges"
    name="surcharges"
    onChange={(e) => setSurcharges(e.target.value)}
    required
  />
</div>
<div className="col-lg-4 mb-3">
  <label htmlFor="totalRemittence" className="form-label">
    Total Remiittence
  </label>
  <input
    type="text"
    className="form-control"
    id="totalRemittence"
    name="totalRemittence"
    onChange={(e) => setTotalRemittence(e.target.value)}
    required
  />
</div>
</div>
<div className='row'>

<div className="col-lg-4 mb-3">
  <label htmlFor="bankName" className="form-label">
    Bank Name
  </label>
  <input
    type="text"
    className="form-control"
    id="bankName"
    name="bankName"
    onChange={(e) => setBankName(e.target.value)}
    required
  />
</div>
<div className="col-lg-4 mb-3">
  <label htmlFor="branchNo" className="form-label">
    Branch No
  </label>
  <input
    type="text"
    className="form-control"
    id="branchNo"
    name="branchNo"
    onChange={(e) => setBranchNo(e.target.value)}
    required
  />
</div>
<div className="col-lg-4 mb-3">
  <label htmlFor="chequeNo" className="form-label">
    Cheque No
  </label>
  <input
    type="text"
    className="form-control"
    id="chequeNo"
    name="chequeNo"
    onChange={(e) => setChequeNo(e.target.value)}
    required
  />
</div>

</div>
<button className="filter" onClick={saveDataToDatabase}>
            Save
          </button>

</div>


        <table className="table">
            <thead>
              <tr>
                <th rowSpan={2}>Emp No</th>
                <th rowSpan={2}>Employee Name</th>
                <th rowSpan={2}>NIC</th>
                <th rowSpan={2}>EPF No</th>
                <th rowSpan={2}>Payment Date</th>
                <th colSpan={3}>Contribution</th>
                <th rowSpan={2}>Basic Salary</th>  
              </tr>
              <tr>
                <th>Total</th>
                <th>Employer</th>
                <th>Employee</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((payment) => (
                
                <tr key={payment.id}>
                  <td>{payment.empNo}</td>
                  <td>{payment.employeeName}</td>
                  <td>{payment.nic}</td>
                  <td>{payment.epfNo}</td>
                  <td>{payment.date}</td>
                  <td>{payment.contributionTotal}</td>
                  <td>{payment.epf8}</td>
                  <td>{payment.etfContribution}</td>
                  <td>{payment.salary}</td>
            
               
                  
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

