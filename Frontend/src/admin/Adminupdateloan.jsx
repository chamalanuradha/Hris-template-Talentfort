import React from 'react';
import './Adminupdateloan.css';
import Sidebar from '../component/Sidebar';
import Updateloan from '../component/Updateloan'


export default function AdminupdateLoan() {
  
  return (
    <div className="main-body">
      <div>
      <Sidebar/>
      </div>
    <div className="adminupdateloan">
        <Updateloan/>
      </div>
    </div>
  );
}
