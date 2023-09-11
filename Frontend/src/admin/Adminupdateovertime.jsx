import React from 'react';
import './Adminupdateovertime.css';
import Sidebar from '../component/Sidebar';
import Updateovertime from '../component/Updateovertime'

export default function Adminupdateovertime() {


  return (
    <div className="main-body">
    <div>
    <Sidebar/>
    </div>
  <div className="adminupdateovertime">
     <Updateovertime/>
    </div>
    </div>
  );
}
