import React from 'react';
import Sidebar from '../component/Sidebar';
import Bcard from '../component/Bcardreport';
import './Adminbcardreport.css'

export default function Adminbcardreport() {
 

  return (
    <div className="main-body">
      <div>
        <Sidebar />
      </div>
      <div className="adminbcardreport">
        <Bcard/>
      </div>
    </div>
  );
}


