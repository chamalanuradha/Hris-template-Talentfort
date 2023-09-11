import React from 'react'
import Cform from '../component/Employeecformreport'
import Superadminsidebar from '../component/Superadminsidebar';
import './Superadminemployeecformreport.css'

export default function Superadminemployeecformreport() {
  return (
    <div className="main-body">
        <div>
    <Superadminsidebar/>
    </div>
      <div className="superadmincformreport">
        <Cform/>
      </div>
      
    </div>
  );
}
