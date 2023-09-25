import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './Updatepayment.css';


export default function UpdatePayment() {
  const [paymentData, setPaymentData] = useState({
    empNo: '',
    employeeName: '',
    salary: '',
    travellingDaily: '',
    farewell: '',
    travelling: '',
    dfarewell: '',
    attendingDays: '',
    date: '',
    epfNo: '',
  });

  const location = useLocation();

  const paymentId = location.pathname.split('/')[2];

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const Res = await axios.get(`http://localhost:8080/payments/${paymentId}`);
        const { empNo, employeeName, salary, travellingDaily, farewell, travelling, dfarewell, attendingDays, date, epfNo} = Res.data;
        setPaymentData({
          empNo,
          employeeName,
          epfNo,
          salary,
          travellingDaily,
          farewell,
          travelling,
          dfarewell,
          attendingDays,
          date,
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchPayment();
  }, [paymentId]);

  const handleChange = async (e) => {
    const { name, value } = e.target;

    setPaymentData((prevPaymentData) => ({
      ...prevPaymentData,
      [name]: value,
    }));
  };
  
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/payments/${paymentId}`, paymentData);
      alert('Payment updated successfully.'); // You can show a success message if needed.
        
      // Navigate to the previous page with a reload
      window.history.back();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main-body">
  <div className="updatepayment">
      <h1>Update Payment</h1>
      <form>
      <div className="mb-3">
          <label htmlFor="empNo" className="form-label">
            Employee No
          </label>
          <input
            type='text'
            className="form-control"
            id="empNo"
            name="empNo"
            value={paymentData.empNo}
            readOnly
          />
        </div>
        <div className="mb-3">
          <label htmlFor="employeeName" className="form-label">
            Employee Name
          </label>
          <input
            type='text'
            className="form-control"
            id="employeeName"
            name="employeeName"
            value={paymentData.employeeName}
            readOnly
          />
        </div>
        <div className="mb-3">
          <label htmlFor="epfNo" className="form-label">
            EPF No
          </label>
          <input
            type='text'
            className="form-control"
            id="epfNo"
            name="epfNo"
            value={paymentData.epfNo}
            readOnly
          />
        </div>
        
  <div>
    <label htmlFor="salary" className="form-label">Salary</label>
    <input 
     className='form-control' 
    type="text" 
    id="salary" 
    name="salary"
    value={paymentData.salary}
    onChange={handleChange}
     />
  </div>
  <div>
    <label className="form-label">Additions</label>
    <div>
      <label htmlFor="travellingDaily" className="sub-label">Travelling (Daily)</label>
      <input
       className='form-control'  
      type="text" 
      id="travellingDaily" 
      name="travellingDaily"
      value={paymentData.travellingDaily}
      onChange={handleChange}
       />
    </div>
    <div>
      <label htmlFor="farewell" className="sub-label">Farewell</label>
      <input 
       className='form-control' 
      type="text" 
      id="farewell" 
      name="farewell"
      value={paymentData.farewell}
      onChange={handleChange}
       />
    </div>
    <div>
      <label htmlFor="travelling" className="sub-label">Travelling</label>
      <input 
       className='form-control' 
      type="text" 
      id="travelling" 
      name="travelling"
      value={paymentData.travelling}
      onChange={handleChange}
       />
    </div>
  </div>
  <div>
    <label className='form-label'>Deductions</label>
    <div>
      <label htmlFor="dfarewall" className="sub-label">Farwell</label>
      <input 
       className='form-control' 
      type="text" 
      id="dfarewell" 
      name="dfarewell"
      value={paymentData.dfarewell}
      onChange={handleChange}
       />
    </div>
  
  </div>
  
  <div>
    <label htmlFor="attendingDays" className="form-label">Attending Days</label>
    <input 
     className='form-control' 
    type="text" 
    id="attendingDays" 
    name="attendingDays"
    value={paymentData.attendingDays}
    onChange={handleChange}
     />
  </div>
  <div>
    <label htmlFor="date" className="form-label">Date</label>
    <input
      className='form-control'
      type="date"
      id="date"
      name="date"
      value={paymentData.date}
      onChange={handleChange}
    />
  </div>
  <button type="submit" className="btn btn-primary" onClick={handleClick}>
          Update
        </button>

</form>
    </div>
    </div>
  );
}
