import React from 'react'
import Superadminsidebar from '../component/Superadminsidebar';
import Employeereport from '../component/Employeereport';
import './Superadminemployeereport.css'

export default function Superadminemployeereport() {
  return (
    <div className="main-body">
    <div>
    <Superadminsidebar/>
    </div>
      <div className="superadminemployeereport">
       <Employeereport/>
      </div>
      </div>
  )
}
