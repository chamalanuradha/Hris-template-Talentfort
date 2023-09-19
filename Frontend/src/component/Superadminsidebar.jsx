import React, { useState } from 'react';
import { FaTachometerAlt,FaUserTie,FaBuilding , FaMoneyCheckAlt, FaFileAlt, FaClock, FaBars, FaUserAlt, FaRegChartBar, FaCalendarTimes, FaAngleRight } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import './Superadminsidebar.css';

export default function Superadminsidebar({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isReportOpen, setIsReportOpen] = useState(false);
  
    const toggle = () => setIsOpen(!isOpen);
    const toggleReport = () => setIsReportOpen(!isReportOpen);
  
    const menuItem = [
      {
        path: "/superadmin",
        name: "Dashboard",
        icon: <FaTachometerAlt />,
      }, {
        path: "/companies",
        name: "Companies",
        icon: <FaBuilding  />,
      }, {
        path: "/users",
        name: "Users",
        icon: <FaUserTie />,
      },

      {
        path: "/superadminemployee",
        name: "Employee",
        icon: <FaUserAlt />,
      },
      {
        path: "/superadminloan",
        name: "Loan",
        icon: <FaRegChartBar />,
      },
      {
        path: "/superadminovertime",
        name: "Overtime",
        icon: <FaClock />,
      },
      {
        path: "/superadminleave",
        name: "Leave",
        icon: <FaCalendarTimes />,
      },
      {
        path: "/superadminpayment",
        name: "Payment",
        icon: <FaMoneyCheckAlt />,
      },
      {
        name: "Reports",
        icon: <FaFileAlt />,
        arrowIcon: <FaAngleRight />,
        submenu: [
          {
            path: "/superadminemployeereport",
            name: "Employee"
          },
          {
            path: "/superadminpaymentreport",
            name: "Monthly Payment"
          },
          {
            path: "/superadminemployeepaymentreport",
            name: "Employee Payslips"
          },
          {
            path: "/superadminemployeecformreport",
            name: "C Form"
          },
          {
            path: "/superadminbankslip",
            name: "Bank slip"
          },
          {
            path: "/superadminbcard",
            name: "B card"
          }
          
          // Add more report submenu items here
        ]
      }
    ];
  
  const handlelogout = () => {
  axios.post('http://localhost:8081/logout')
    .then(res => {
      console.log('Logged out successfully:', res.data);
      window.location.href = '/';
    })
    .catch(error => {
      console.error('Error logging out:', error);
    });

}
  
    return (
        
      <div className="superadminsidebar">
      <div style={{ width: isOpen ? "200px" : "50px" }} className="superadminsidebar">
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
  
