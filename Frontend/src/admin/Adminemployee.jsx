import React from 'react';
import './Adminemployee.css';
import Sidebar from '../component/Sidebar';
import Employee from '../component/Employee';


export default function Adminemployee() {
  
  return (
    <div className="main-body">
      <div>
      <Sidebar />
      </div>
      <div className="adminemployee">
       <Employee/>
      </div>
    </div>
  );
}
