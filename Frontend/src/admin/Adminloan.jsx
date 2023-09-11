import React from 'react';
import './Adminloan.css';
import Sidebar from '../component/Sidebar';
import Loan from '../component/Loan'


export default function Adminloan() {
    

  return (
    <div className="main-body">
       <div>
      <Sidebar />
      </div>
    <div className="adminloan">
      <Loan/>
    </div>
    </div>
  );
}
