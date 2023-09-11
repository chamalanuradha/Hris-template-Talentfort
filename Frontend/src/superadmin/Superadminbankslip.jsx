import React from 'react'
import Superadminsidebar from '../component/Superadminsidebar';
import Bankslip from '../component/Bankslip';
import './Superadminbankslip.css'
export default function Superadminbankslip() {
  return (
    <div className="main-body">
        <div>
    <Superadminsidebar/>
    </div>
      <div className="superadminbankslipreport">
       <Bankslip/>
      </div>
    
    </div>
  )
}
