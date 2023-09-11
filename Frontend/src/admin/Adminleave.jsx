import React from 'react';
import './Adminleave.css';
import Sidebar from '../component/Sidebar';
import Leave from '../component/Leave'


export default function Adminleave() {
  
  return (
    <div className="main-body">
      <div>
      <Sidebar />
      </div>
    <div className="adminleave">
     <Leave/>
    </div>
    </div>
  )
}
