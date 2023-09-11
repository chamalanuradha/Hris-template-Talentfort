import React from 'react';
import Superadminsidebar from '../component/Superadminsidebar';
import Employee from '../component/Employee';
import './Superadminemployee.css';




export default function Superadminemployee() {
  
  return (
    <div className="main-body">
      <div>
      <Superadminsidebar />
      </div>
      <div className="superadminemployee">
       <Employee/>
      </div>
    </div>
  );
}
