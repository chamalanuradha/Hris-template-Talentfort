import React from 'react'
import Superadminsidebar from '../component/Superadminsidebar';
import Monthlyreport from '../component/Paymentreport'
import './Superadminpaymentreport.css'

export default function Superadminpaymentreport() {
  return (
    <div className="main-body">
   <div>
    <Superadminsidebar/>
    </div>
      <div className="superadminpaymentreport">
        <Monthlyreport/>
      </div>

    </div>
  )
}
