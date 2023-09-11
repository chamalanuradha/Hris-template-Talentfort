import React from 'react';
import './Adminpayment.css';
import Sidebar from '../component/Sidebar';
import Payment from '../component/Payment'


export default function Adminpayments() {
  
  return (
   <div className="main-body">
       <div>
      <Sidebar />
      </div>
      <div className="adminpayment">
        <Payment/>
        
      </div>
    </div>
  );
}
