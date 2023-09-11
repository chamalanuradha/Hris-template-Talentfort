import React, { useState } from 'react';
import { FaTachometerAlt, FaMoneyCheckAlt, FaFileAlt, FaClock, FaBars, FaUserAlt, FaRegChartBar, FaCalendarTimes, FaAngleRight } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import './Sidebar.css';


export default function Sidebar({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const toggleReport = () => setIsReportOpen(!isReportOpen);

  const menuItem = [
    {
      path: "/dash",
      name: "Dashboard",
      icon: <FaTachometerAlt />,
    },
    {
      path: "/employee",
      name: "Employee",
      icon: <FaUserAlt />,
    },
    {
      path: "/loan",
      name: "Loan",
      icon: <FaRegChartBar />,
    },
    {
      path: "/overtime",
      name: "Overtime",
      icon: <FaClock />,
    },
    {
      path: "/leave",
      name: "Leave",
      icon: <FaCalendarTimes />,
    },
    {
      path: "/payment",
      name: "Payment",
      icon: <FaMoneyCheckAlt />,
    },
    {
      name: "Reports",
      icon: <FaFileAlt />,
      arrowIcon: <FaAngleRight />,
      submenu: [
        {
          path: "/employeereport",
          name: "Employee"
        },
        {
          path: "/paymentreport",
          name: "Monthly Payment"
        },
        {
          path: "/employeepaymentreport",
          name: "Employee Payslips"
        },
        {
          path: "/employeecformreport",
          name: "C Form"
        },
        {
          path: "/bankslip",
          name: "Bank slip"
        },
        {
          path: "/bcardreport",
          name: "B card"
        }
        
        // Add more report submenu items here
      ]
    }
  ];
  const handlelogout = () => {
    axios.post('http://localhost:8080/logout')
      .then(res => {
        console.log('Logged out successfully:', res.data);
        window.location.href = '/';
      })
      .catch(error => {
        console.error('Error logging out:', error);
      });
  
  }


  return (
      
    <div className="sidebar">
        <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
          <div className="top_section">
            <h4 style={{ display: isOpen ? "block" : "none" }} className="logo">Logo</h4>
            <div style={{ marginLeft: isOpen ? "85px" : "2px" }} className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>
          <div className="bottom_section">
          {menuItem.map((item, index) => {
            if (item.submenu) {
              return (
                <div key={index} className="dropdown">
                  <div className="link" onClick={toggleReport}>
                    <div className="icon1">{item.icon}</div>
                    <div className="link_text" style={{ display: isOpen ? "block" : "none" }}>{item.name}</div>
                
                    {isOpen && (

                      <div className="icon2" style={{ marginRight: '5px', justifyContent: 'flex-end' }}>
                        {item.arrowIcon}
                      </div>
                      
                    )}
                  </div>
                  {isOpen && isReportOpen && (
                    <div className="dropdown-content">
                      {item.submenu.map((submenuItem, submenuIndex) => (
                        <NavLink
                          key={submenuIndex}
                          to={submenuItem.path}
                          className="submenu-link"
                        >
                          <div className="submenu_link_text" style={{ display: isOpen ? "block" : "none", marginLeft: '10px' }}>
                            {submenuItem.name}
                          </div>
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              );
            } else {
              return (
                <NavLink
                  key={index}
                  to={item.path}
                  className="link"
                >
                  <div className="icon1">{item.icon}</div>
                  <div className="link_text" style={{ display: isOpen ? "block" : "none" }}>{item.name}</div>
                </NavLink>
              );
            }
          })}
        </div>
        <main>{children}</main>
        <button type="submit" className="btn btn-primary logout" onClick={handlelogout}>
              Logout
            </button>
            </div>
      </div>
    );
}
