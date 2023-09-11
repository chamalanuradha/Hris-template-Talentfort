import React from 'react';
import Superadminsidebar from '../component/Superadminsidebar';
import Payments from '../component/Payment';
import './Superadminpayment.css'

export default function Superadminpayment() {
  
    return (
     <div className="main-body">
         <div>
        <Superadminsidebar />
        </div>
  
        <div className="superadminpayment">
      <Payments/>
        </div>
      </div>
    );
  }
  