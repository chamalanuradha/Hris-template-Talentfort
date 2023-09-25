import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import employe from '../assets/division.png'
import loans from '../assets/employee.png';
import leave from '../assets/work-life.png';
import Sidebar from '../component/Sidebar';
import payment from '../assets/temp-worker.png';
import './Admin.css';
import Dash from '../component/Dashboard'

export default function Admin() {

  const [employeeCount, setEmployeeCount] = useState(0);
  const [loanAmount, setLoanAmount] = useState(0);
  const [overtime, setOvertime] = useState(0);  
  const [leaves, setLeaves] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/employeecount'); 
        const data = response.data;
        const count = data.employeeCount;

        setEmployeeCount(count);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(()=> {
    const fetchAmount = async ()=> {
    try {
      const response = await axios.get('http://localhost:8080/loanamount');
      const data = response.data;
      const count =data.loanAmount;
      setLoanAmount(count);
    } catch(error) {
      console.log(error);
    }
  };
    fetchAmount();  
  }, []);

  useEffect(()=> {
    const fetchOvertime = async ()=> {
    try {
      const res = await axios.get('http://localhost:8080/totalovertime');
      const data = res.data;
      const count =data.totalOvertime;
      setOvertime(count);
    } catch(error) {
      console.log(error);

    }
  };
    fetchOvertime();
  }, []);

  useEffect(()=> {
    const fetchLeaves = async ()=> {
    try {
      const res = await axios.get('http://localhost:8080/totalleaves');
      const data = res.data;
      const count =data.totalLeaves;
      setLeaves(count);
    } catch(error) {
      console.log(error);

    }
  };
    fetchLeaves();
  }, []);
  return (
    <div className='main-body'>
    <div>
    <Sidebar />
    </div>
    <div className='dashboard'> 
    <h1>Admin Dashboard</h1>
         <div className="contant" >
          <div className="row">
           <div className="col-md-3">
            <div className="card"> 
            <h2>Employees</h2>
            <p className='details'>{employeeCount}</p>
            <img className='bg' src={employe} alt="" />
            </div>
          </div>

          <div className="col-md-3">
    <div className="card">
      <h2>Loans</h2>
      <p className='details'>{loanAmount}</p>
      <img className='bg' src={loans} alt="" />
    </div>
  </div>

  <div className="col-md-3">
    <div className="card">
      <h2>Overtime</h2>
      <p className='details'>{overtime}</p>
      <img className='bg' src={payment} alt="" />
    </div>
  </div>

  <div className="col-md-3">
    <div className="card">
      <h2>Leaves</h2>
      <p className='details'>{leaves}</p>
      <img className='bg' src={leave} alt="" />
    </div>
  </div>
</div>
</div>

<div className='graph'>
<Dash/>
</div>

</div>
</div>
  )
}
