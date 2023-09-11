import React from 'react'
import Superadminsidebar from '../component/Superadminsidebar';
import Bcard from '../component/Bcardreport';
import './Superadminbcard.css'

export default function Superadminbcard() {
  return (
    <div className="main-body">
        <div>
    <Superadminsidebar/>
    </div>
      <div className="superadminbcardreport">
       <Bcard/>
      </div>
    </div>
  )
}
