import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import './Dashboard.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import employe from '../assets/division.png'
import loans from '../assets/employee.png';
import leave from '../assets/work-life.png';
import payment from '../assets/temp-worker.png';
import Graph1 from '../component/Graph1.jsx';
import Graph2 from '../component/Graph2.jsx';
import Graph3 from '../component/Graph3.jsx';
import Graph4 from '../component/Graph4.jsx';
import Sidebar from '../component/Sidebar'


// eslint-disable-next-line import/no-anonymous-default-export
export default function Dash() {

  const [employeeCount, setEmployeeCount] = useState(0);
  const [loanAmount, setLoanAmount] = useState(0);
  const [overtime, setOvertime] = useState(0);  
  const [leaves, setLeaves] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8081/employeecount'); 
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
      const response = await axios.get('http://localhost:8081/loanamount');
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
      const res = await axios.get('http://localhost:8081/totalovertime');
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
      const res = await axios.get('http://localhost:8081/totalleaves');
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
            <div className="card card-employees"> 
            <h2>Employees</h2>
            <p className='details'>{employeeCount}</p>
            <img className='bg' src={employe} alt="" />
            </div>
          </div>

          <div className="col-md-3">
    <div className="card card-loans">
      <h2>Loans</h2>
      <p className='details'>{loanAmount}</p>
      <img className='bg' src={loans} alt="" />
    </div>
  </div>

  <div className="col-md-3">
    <div className="card card-payments">
      <h2>Overtime</h2>
      <p className='details'>{overtime}</p>
      <img className='bg' src={payment} alt="" />
    </div>
  </div>

  <div className="col-md-3">
    <div className="card card-leaves">
      <h2>Leaves</h2>
      <p className='details'>{leaves}</p>
      <img className='bg' src={leave} alt="" />
    </div>
  </div>
</div>

    <div className="row">
    <div className="col-lg-6">
      <div className='graph1'>
      <h4>Leaves Categaries</h4>
    <Graph1 />
    </div>
    </div>
    <div className="col-lg-6 col-md-3">
      <div className='graph3'>
        <h4>Loans Categaries</h4>
      <Graph3/>
      </div>  
    </div> 
    </div>

    <div className="row">
    <div className="col-lg-6 col-md-3">
      <div className='graph2'>
        <h4>Employees Categaries</h4>
      <Graph2/>
      </div>
    </div>
    <div className="col-lg-6 col-md-3">
    <div className='graph1'>
      <h4>Overtime</h4>
    <Graph4 />
    </div> 
    </div>
    </div>
    </div>
   </div> 
    </div>

  )
}
