import React from 'react';
import './Adminbankslip.css'
import Sidebar from '../component/Sidebar';
import Bankslip from '../component/Bankslip'


export default function Adminbankslip() {
  
  return (
    <div className="main-body">
    <div>
    <Sidebar/>
    </div>
      <div className="adminbankslip">
        <Bankslip/>
      </div>
    </div>
  );
}
