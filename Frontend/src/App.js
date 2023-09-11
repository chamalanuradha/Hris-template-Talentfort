import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './component/Login';

import Admin from './admin/Admin';

import Dash from './component/Dashboard';

import Employee from './admin/Adminemployee';
import Loan from './admin/Adminloan';
import Payments from './admin/Adminpayment';
import Leave from './admin/Adminleave';
import Overtime from './admin/Adminovertime';

import Addemployee from './component/Addemployee';
import Addloan from './component/Addloan';
import Addovertime from './component/Addovertime';
import Addleave from './component/Addleave';
import Addpayment from './component/Addpayment';

import Updateemployee from './component/Updateemployee';
import UpdateLoan from './component/Updateloan';
import Updateovertime from './component/Updateovertime';
import Updateleave from './component/Updateleave';
import Updatepayment from './component/Updatepayment';

import Employeereport from './admin/Adminemployeereport';
import Paymentreport from './admin/Adminpaymentreport';
import Employeepaymentreport from './admin/Adminemployeepaymentreport';
import Cformreport from './admin/Adminemployeecformreport';
import Bankslip from './admin/Adminbankslip';
import Bcardreport from './admin/Adminbcardreport';




import Superadmin from './superadmin/Superadmin';

import Users from './superadmin/Users'
import Companies from './superadmin/Companies'
import Addcompany from './superadmin/Addcompany'
import Adduser from './superadmin/Adduser';
import Updatecompany from './superadmin/Updatecompany';
import Updateuser from './superadmin/Updateuser';
import Superadminemployee from './superadmin/Superadminemployee';
import Superadminloan from './superadmin/Superadminloan';
import Superadminovertime from './superadmin/Superadminovertime';
import Superadminpayment from './superadmin/Superadminpayment';
import Superadminleave from './superadmin/Superadminleave';
import Superadminemployeereport from './superadmin/Superadminemployeereport';
import Superadminemployeepaymentreport from './superadmin/Superadminemployeepaymentreport';
import Superadminpaymentreport from './superadmin/Superadminpaymentreport';
import Superadminemployeecformreport from './superadmin/Superadminemployeecformreport';
import Superadminbankslip from './superadmin/Superadminbankslip';
import Superadminbcard from './superadmin/Superadminbcard';

function App() {
  return (
    <BrowserRouter>
  <Routes>
          <Route  path="/" element={<Login />} />
          <Route path="/dash" element={<Dash/>}></Route>
          <Route path="/admin" element={<Admin />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/addemployee" element={<Addemployee/>} />
          <Route path="/updateemployee/:id" element={<Updateemployee />} />
          <Route path="/loan" element={<Loan />} />
          <Route path="/addloan" element={<Addloan />} />
          <Route path="/updateloan/:id" element={<UpdateLoan />} />
          <Route path="/overtime" element={<Overtime />} />
          <Route path="/addovertime" element={<Addovertime />} />
          <Route path="/updateovertime/:id" element={<Updateovertime />} />
          <Route path="/leave" element={<Leave />} />
          <Route path="/addleave" element={<Addleave />} />
          <Route path="/updateleave/:id" element={<Updateleave />} />
          <Route path="/payment" element={<Payments />} />
          <Route path="/addpayment" element={<Addpayment />} />
          <Route path="/updatepayment/:id" element={<Updatepayment />} />
          <Route path="/employeereport" element={<Employeereport />} />
          <Route path="/paymentreport" element={<Paymentreport />} />
          <Route path="/employeepaymentreport" element={<Employeepaymentreport />} />
          <Route path="/employeecformreport" element={<Cformreport />} />
          <Route path="/bankslip" element={<Bankslip/>}/>
          <Route path="bcardreport" element={<Bcardreport/>}/>


          
        
        <Route path="/superadmin" element={<Superadmin />} />
        <Route path="/users" element={<Users />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/addcompany" element={<Addcompany />} />
        <Route path="/adduser" element={<Adduser />} />
        <Route path="/updatecompany/:id" element={<Updatecompany />} />
        <Route path="/updateuser/:id" element={<Updateuser />} />
        <Route path="/superadminemployee" element={<Superadminemployee />} />
        <Route path="/superadminloan" element={<Superadminloan />} />
        <Route path="/superadminovertime" element={<Superadminovertime />} />
        <Route path="/superadminpayment" element={<Superadminpayment />} />
        <Route path="/superadminleave" element={<Superadminleave />} />
        <Route path="/superadminemployeereport" element={<Superadminemployeereport />} />
        <Route path="/superadminemployeepaymentreport" element={<Superadminemployeepaymentreport />} />
        <Route path="/superadminpaymentreport" element={<Superadminpaymentreport />} />
        <Route path="/superadminemployeecformreport" element={<Superadminemployeecformreport />} />
        <Route path="/superadminbankslip" element={<Superadminbankslip />} />
        <Route path="/superadminbcard" element={<Superadminbcard />} />
        

      
      </Routes>
      </BrowserRouter>
  );
}

export default App;



