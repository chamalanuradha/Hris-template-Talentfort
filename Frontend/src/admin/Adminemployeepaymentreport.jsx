import React  from 'react';
import Sidebar from '../component/Sidebar';
import Paymentreport from '../component/Employeepaymentreport'
import './Adminemployeepaymentreport.css'

export default function Adminemployeepaymentreport() {
  
  return (
    <div className="main-body">
        <div>
    <Sidebar/>
    </div>
      <div className="adminpaymentreport">
       <Paymentreport/>
      </div>
    
    </div>
  );
}
