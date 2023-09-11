import React from 'react';

import './Adminupdateleave.css';
import Sidebar from '../component/Sidebar';
import Updateleave from '../component/Updateleave'


export default function Adminupdateleaves() {
 
  return (
    <div className="main-body">
    <div>
    <Sidebar/>
    </div>
  <div className="updateleave">
 <Updateleave/>
</div>
</div>
);
}