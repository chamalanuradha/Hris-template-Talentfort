import React from 'react';
import './Adminupdatepayment.css';
import Sidebar from '../component/Sidebar';
import Updatepayment from '../component/Updatepayment';

export default function AdminupdatePayment() {
 
  return (
    <div className="main-body">
    <div>
    <Sidebar/>
    </div>
  <div className="adminupdatepayment">
     <Updatepayment/>
    </div>
    </div>
  );
}
