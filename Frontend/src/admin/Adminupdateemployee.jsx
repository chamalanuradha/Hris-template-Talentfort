import React from 'react';
import './Adminupdateemployee.css';
import Sidebar from '../component/Sidebar';
import UpdateEmployee from '../component/Updateemployee'


export default function AdminupdateEmployee() {
  
  return (
    <div className="main-body">
      <div>
      <Sidebar/>
      </div>
    <div className="adminupdateemployee">
      <UpdateEmployee/>
      
    </div>
    </div>
  );
}
