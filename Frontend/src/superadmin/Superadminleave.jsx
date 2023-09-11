import React from 'react';
import Superadminsidebar from '../component/Superadminsidebar';
import Leave  from '../component/Leave';
import './Superadminleave.css';

export default function Superadminleave() {
    
    return (
      <div className="main-body">
        <div>
        <Superadminsidebar />
        </div>
      <div className="superadmineleave">
        <Leave/>
      </div>
      </div>
    )
  }
  
