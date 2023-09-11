import React from 'react';
import Superadminsidebar from '../component/Superadminsidebar';
import Loan  from '../component/Loan';
import './Superadminloan.css'



export default function Superadminloan() {
    
  return (
    <div className="main-body">
    <div>
   <Superadminsidebar />
   </div>
 <div className="superadminloan">
   <Loan/>
 </div>
 </div>
  )
}
