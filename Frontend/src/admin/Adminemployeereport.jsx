import React from 'react';
import Employeereport from '../component/Employeereport'
import Sidebar from '../component/Sidebar';
import './Adminemployeereport.css'

export default function Adminemployeereport() {
  
  return (
    <div className="main-body">
    <div>
    <Sidebar/>
    </div>
      <div className="adminemployeereport">
       <Employeereport/>
      </div>
      </div>
  );
}
