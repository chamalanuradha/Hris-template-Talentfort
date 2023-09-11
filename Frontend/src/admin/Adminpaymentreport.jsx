import React from 'react';

import Sidebar from '../component/Sidebar';
import Monthlyreport from '../component/Paymentreport'


export default function Adminpaymentreport() {
 
  return (
    <div className="main-body">
   <div>
    <Sidebar/>
    </div>
      <div className="adminpaymentreport">
        <Monthlyreport/>
      </div>

    </div>
  );
}
