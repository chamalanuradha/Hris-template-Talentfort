import React from 'react';
import Sidebar from '../component/Sidebar';
import Cform from '../component/Employeecformreport'
import './Adminemployeecformreport.css'


export default function Adminemployeecformreport() {
 
  return (
    <div className="main-body">
        <div>
    <Sidebar/>
    </div>
      <div className="admincformreport">
        <Cform/>
      </div>
      
    </div>
  );
}

