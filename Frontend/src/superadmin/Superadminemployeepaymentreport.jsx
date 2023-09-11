import React from 'react'
import Paymentreport from '../component/Employeepaymentreport'
import Superadminsidebar from '../component/Superadminsidebar';
import './Superadminemployeepayment.css'

export default function Superadminemployeepayment() {
  return (
    <div className="main-body">
        <div>
    <Superadminsidebar/>
    </div>
      <div className="superadminemployeepaymentreport">
       <Paymentreport/>
      </div>
    
    </div>
  )
}
