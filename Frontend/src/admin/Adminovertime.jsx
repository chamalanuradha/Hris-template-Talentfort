import React from 'react';
import './Adminovertime.css'
import Sidebar from '../component/Sidebar';
import Overtime from '../component/Overtime'


export default function Adminovertime() {


  return (
    <div className="main-body">
       <div>
      <Sidebar />
      </div>
    <div className="adminovertime">
    <Overtime/>
    </div>
    </div>
  );
}

