import React from 'react';
import Superadminsidebar from '../component/Superadminsidebar';
import Overtime from '../component/Overtime';
import './Superadminovertime.css'

export default function Superadminovertime() {
    
  return (
    <div className="main-body">
       <div>
      <Superadminsidebar />
      </div>
    <div className="superadminovertime">
     <Overtime/>
    </div>
    </div>
  );
}