const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const DB = require('./config/database');

const app = express();

DB.connect();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  exposedHeaders: ['Access-Control-Allow-Credentials'],
}));

app.post('/login', (req, res) => {
  const { username, password, role } = req.body;

  const query = 'SELECT * FROM users WHERE username = ? AND password = ? AND role = ?';
  DB.connection.promise()
    .query(query, [username, password, role])
    .then(([rows]) => {
      if (rows.length > 0) {
        const token = jwt.sign({ username, role }, 'your-secret-key', { expiresIn: '1h' });
        return res.json({ Login: true, token, role }); // Include role in the response
      } else {
        return res.json({ Login: false });
      }
    })
    .catch((err) => {
      console.error('Error in login route:', err);
      return res.status(500).json({ message: 'Server error' });
    });
});

app.post('/logout', (req, res) => {
  return res.json({ Logout: true });
})

app.get('/login', (req, res) => {
  
  
  console.log('Session user:', req.session.user.username);
  console.log('Session role:', req.session.user.role);

  if (req.session.user) {
    return res.json({ valid: true, username: req.session.user.username, role: req.session.user.role  });
  } else {
    return res.json({ valid: false });
  }
});
//GET methods for tables
//Get employee details 
app.get('/employees', (req, res) => {
  DB.connection.promise().query('SELECT * FROM employees')
    .then(([results]) => {
      const employees = results.map((employee) => ({
        empNo:employee.empNo,
        id: employee.id,
        fullName: employee.fullName,
        maritalStatus: employee.maritalStatus,
        gender: employee.gender,
        dob : employee.dob,
        nic: employee.nic,
        designation: employee.designation,
        joinedDate: employee.joinedDate,
        companyName: employee.companyName,
        department: employee.department,
        currentAddress: employee.currentAddress,
        phone: employee.phone,
        epfNo: employee.epfNo,
        country: employee.country,
      }));
      res.json(employees);
    })

    .catch((error) => {
      console.error('Error retrieving employees:', error);
      res.status(500).json({ error: 'Failed to retrieve employees' });
    });
});


//Get payment details
app.get('/payments', (req, res) => {
  DB.connection.promise().query('SELECT * FROM payments')
    .then(([results]) => {
      const payments = results.map((result) => ({
        id: result.id,
        empNo: result.empNo,
        epfNo: result.epfNo,
        employeeName: result.employeeName,
        salary: result.salary,
        travellingDaily: result.travellingDaily,
        farewell: result.farewell,
        travelling: result.travelling,
        dfarewell: result.dfarewell,
        epf8: result.epf8,
        etfContribution: result.etfContribution,
        netpaid: result.netpaid,
        totalSalaryExpense: result.totalSalaryExpense,
        attendingDays: result.attendingDays,
        date: result.date,
        monthName: result.monthName,
        additions: result.additions,
        deductions: result.deductions,
      }));
      res.json(payments);
    })
    .catch((error) => {
      console.error('Error retrieving payments:', error);
      res.status(500).json({ error: 'Failed to retrieve payments' });
    });
});


// Get loan details
app.get('/loans', (req, res) => {
  DB.connection.promise()
    .query('SELECT * from loans')
    .then(([results]) => {
      const loans = results.map((result) => ({
        id: result.id,
        empNo: result.empNo, 
        employeeName: result.employeeName,
        amount: result.amount,
        interestRate: result.interestRate,
        duration: result.duration,
      }));
      res.json(loans);
    })
    .catch((error) => {
      console.error('Error retrieving loans:', error);
      res.status(500).json({ error: 'Failed to retrieve loans' });
    });
});

//Get leave details
app.get('/leaves', (req, res) => {
  DB.connection.promise()
    .query('SELECT * FROM leaves')
    .then(([results]) => {
      const leaves = results.map((result) => ({
        id: result.id,
        empNo: result.empNo,
        employeeName: result.employeeName,
        date: result.date,
        description: result.description,
        leaveHours: result.leaveHours,
      }));
      res.json(leaves);
    })
    .catch((error) => {
      console.error('Error retrieving leaves:', error);
      res.status(500).json({ error: 'Failed to retrieve leaves' });
    });
});


//get overtime details
app.get('/overtimes', (req, res) => {
  DB.connection.promise()
    .query('SELECT * FROM overtimes')
    .then(([results]) => {
      const overtimes = results.map((result) => ({
        id: result.id,
        employeeName: result.employeeName,
        empNo: result.empNo,
         date:result.date,
        hours: result.hours,
        rate: result.rate,
        payment: result.payment,
      }));
      res.json(overtimes);
    })
    .catch((error) => {
      console.error('Error retrieving overtimes:', error);
      res.status(500).json({ error: 'Failed to retrieve overtimes' });
    });
});

//get users
app.get('/users', (req, res) => {
  DB.connection.promise().query('SELECT * FROM users')
    .then(([results]) => {
      const users = results.map((result) => ({
        id: result.id,
        username: result.username,
        role: result.role,
      }));
      res.json(users);
    })

    .catch((error) => {
      console.error('Error retrieving users:', error);
      res.status(500).json({ error: 'Failed to retrieve users' });
    });
});

//get companies

app.get('/companies', (req, res) => {
  DB.connection.promise().query('SELECT * FROM companies')
    .then(([results]) => {
      const companies = results.map((result) => ({
        id: result.id,
        companyName: result.companyName,
      }));
      res.json(companies);
    })

    .catch((error) => {
      console.error('Error retrieving companies:', error);
      res.status(500).json({ error: 'Failed to retrieve companies' });
    });
});

//Get method for update
//get employee details for update
app.get('/employees/:id', (req, res) => {
  const employeeId = req.params.id;

  DB.connection.promise()
    .query('SELECT * FROM employees WHERE id = ?', [employeeId])
    .then(([results]) => {
      if (results.length === 0) {
        res.status(404).json({ error: 'Employee not found' });
      } else {
        const employee = {
          id: results[0].id,
          empNo: results[0].empNo,
          epfNo: results[0].epfNo,
          firstName: results[0].firstName,
          lastName: results[0].lastName,
          fullName: results[0].fullName,
          title: results[0].title,
          maritalStatus: results[0].maritalStatus,
          dob: results[0].dob,
          nic: results[0].nic,
          phone: results[0].phone,
          currentAddress: results[0].currentAddress,
          country: results[0].country,
          zipCode: results[0].zipCode,
          department: results[0].department,
          gender: results[0].gender,
          employeeType: results[0].employeeType,
          workShift: results[0].workShift,
          designation: results[0].designation,
          joinedDate: results[0].joinedDate,
          payGrade: results[0].payGrade,
          payType: results[0].payType,
          accountName: results[0].accountName,
          accountNo: results[0].accountNo,
          bankName: results[0].bankName,
          bankNo: results[0].bankNo,
          branchName:results[0].branchName, 
          branchNo: results[0].branchNo,
          companyName: results[0].companyName,

        };
        res.json(employee);
      }
    })
    .catch((error) => {
      console.error('Error retrieving employee:', error);
      res.status(500).json({ error: 'Failed to retrieve employee' });
    });
});

//get payment details for update
app.get('/payments/:id', (req, res) => {
  const paymentId = req.params.id;

  DB.connection.promise().query('SELECT * FROM payments WHERE id = ?', [paymentId])
    .then(([results]) => {
      if (results.length === 0) {
        res.status(404).json({ error: 'Payment not found' });
      } else {
        const payment = {
          id: results[0].id,
          empNo: results[0].empNo,
          epfNo : results[0].epfNo,
          employeeName: results[0].employeeName,
          salary: results[0].salary,
          travellingDaily: results[0].travellingDaily,
          farewell: results[0].farewell,
          travelling: results[0].travelling,
          dfarewell: results[0].dfarewell,
          epf8: results[0].epf8,
          etfContribution: results[0].etfContribution,
          netpaid: results[0].netpaid,
          totalSalaryExpense: results[0].totalSalaryExpense,
          attendingDays: results[0].attendingDays,
          date: results[0].date
        };
        res.json(payment);
      }
    })
    .catch((error) => {
      console.error('Error retrieving payment:', error);
      res.status(500).json({ error: 'Failed to retrieve payment' });
    });
});
// get loan details for update
app.get('/loans/:id', (req, res) => {
  const loanId = req.params.id;

  DB.connection.promise()
    .query('SELECT * FRom loans WHERE id = ?', [loanId])
    .then(([results]) => {
      if (results.length === 0) {
        // If no loan is found with the specified ID, send a 404 response
        res.status(404).json({ error: 'Loan not found' });
      } else {
        const loan = {
          id: results[0].id,
          amount: results[0].amount,
          interestRate: results[0].interestRate,
          duration: results[0].duration,
          empNo: results[0].empNo,
          employeeName: results[0].employeeName,
        };
        res.json(loan);
      }
    })
    .catch((error) => {
      console.error('Error retrieving loan:', error);
      res.status(500).json({ error: 'Failed to retrieve loan' });
    });
});

//get overtime details
app.get('/overtimes/:id', (req, res) => {
  const overtimeId = req.params.id;

  DB.connection.promise()
    .query('SELECT * FROM Overtimes WHERE id = ?', [overtimeId])
    .then(([results]) => {
      if (results.length === 0) {
        res.status(404).json({ error: 'Overtime not found' });
      } else {
        const overtime = {
          id: results[0].id,
          hours: results[0].hours,
          rate: results[0].rate,
          date: results[0].date,
          empNo: results[0].empNo,
          employeeName: results[0].employeeName,
        };
        res.json(overtime);
      }
    })
    .catch((error) => {
      console.error('Error retrieving overtime:', error);
      res.status(500).json({ error: 'Failed to retrieve overtime' });
    });
});

// get  leaves details
app.get('/leaves/:id', (req, res) => {
  const leaveId = req.params.id;

  DB.connection.promise()
  .query('SELECT * From leaves WHERE id = ?', [leaveId])
    .then(([results]) => {
      if (results.length === 0) {
        res.status(404).json({ error: 'Leave not found' });
      } else {
        const leave = {
          id: results[0].id,
          date:results[0].date,
          description: results[0].description,
          leaveHours: results[0].leaveHours,
          empNo:results[0].empNo,
          employeeName: results[0].employeeName,
        };
        res.json(leave);
      }
    })
    .catch((error) => {
      console.error('Error retrieving leave:', error);
      res.status(500).json({ error: 'Failed to retrieve leave' });
    });
});

// get company details
app.get('/companies/:id', (req, res) => {
  const companyId = req.params.id;

  DB.connection.promise()
    .query('SELECT * FROM companies WHERE id = ?', [companyId])
    .then(([results]) => {
      if (results.length === 0) {
        res.status(404).json({ error: 'Company not found' });
      } else {
        const company = {
          id: results[0].id,
          companyName: results[0].companyName,
         
        };
        res.json(company);
      }
    })
    .catch((error) => {
      console.error('Error retrieving company:', error);
    });
});
//get users details

app.get('/users/:id', (req, res) => {
  const userId = req.params.id;

  DB.connection.promise()
    .query('SELECT * FROM users WHERE id = ?', [userId])
    .then(([results]) => {
      if (results.length === 0) {
        res.status(404).json({ error: 'User not found' });
      } else {
        const user = {
          id: results[0].id,
          username: results[0].username,
          password: results[0].password,
          role: results[0].role,
        };
        res.json(user);
      }
    })
    .catch((error) => {
      console.error('Error retrieving user:', error);
    });
});



//Add
// ADD details to database
app.post('/cform', (req,res)=>{
 const q = 'INSERT INTO cpayments (`chequeNo`,`bankName`,`branchNo`,`contributions`,`surcharges`,`totalRemittence`)  VALUES(?) ';
 const values = [
  req.body.chequeNo,
  req.body.bankName,
  req.body.branchNo,
  req.body.contributions,
  req.body.surcharges,
  req.body.totalRemittence,
 ];
 DB.connection.promise().query(q, [values])
    .then(([results]) => {
      res.json("data saved successfully");
    })
    .catch((error) => {
      console.error('Error inserting employee:', error);
      res.status(500).json({ error: 'Failed to enter data' });
    });
})
//Add employee details
app.post('/employees', (req, res) => {
  const q = "INSERT INTO employees (`title`,`firstName`,`lastName`,`fullName`,`maritalStatus`, `gender`,`dob`, `nic`,`country`,`companyName`,`empNo`,`epfNo`, `department` ,`designation`, `employeeType`,`payGrade` ,`joinedDate`,`workShift`, `currentAddress`,`phone`,`zipCode`,`payType`,`accountName`,`accountNo`,`bankName`,`bankNo`,`branchName`,`branchNo`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.firstName,
    req.body.lastName,
    req.body.fullName,
    req.body.maritalStatus,
    req.body.gender,
    req.body.dob,
    req.body.nic,
    req.body.country,
    req.body.companyName,
    req.body.empNo,
    req.body.epfNo,
    req.body.department,
    req.body.designation,
    req.body.employeeType,
    req.body.payGrade,
    req.body.joinedDate,
    req.body.workShift,
    req.body.currentAddress,
    req.body.phone,
   req.body.zipCode,
   req.body.payType,
   req.body.accountName,
   req.body.accountNo,
   req.body.bankName,
   req.body.bankNo,
   req.body.branchName,
   req.body.branchNo,
 
  ];
  DB.connection.promise().query(q, [values])
    .then(([results]) => {
      res.json("Employee added successfully");
    })
    .catch((error) => {
      console.error('Error inserting employee:', error);
      res.status(500).json({ error: 'Failed to insert employee' });
    });
});
//add payment details
app.post('/payments', (req, res) => {
  const q = "INSERT INTO payments (empNo, employeeName, epfNo ,salary, travellingDaily, farewell, travelling, dfarewell, epf8, etfContribution, netpaid, totalSalaryExpense, attendingDays, date ,  monthName , additions, deductions,contributionTotal) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

  const salary = parseFloat(req.body.salary);
  const travellingDaily = parseFloat(req.body.travellingDaily);
  const farewell = parseFloat(req.body.farewell);
  const travelling = parseFloat(req.body.travelling);
  const dfarewell = parseFloat(req.body.dfarewell);
  const epf8 = salary * 0.08;
  const etfContribution = salary * 0.12;
  const additions = travellingDaily+farewell+travelling;
  const deductions = dfarewell+epf8+etfContribution;

  const netpaid = salary + additions - deductions;
  const totalSalaryExpense = netpaid + epf8 + etfContribution;
  const contributionTotal = etfContribution + epf8;


  const date = new Date(req.body.date);
  const monthName = date.toLocaleString('en-US', { month: 'long' });

  const values = [
    req.body.empNo,
    req.body.employeeName,
    req.body.epfNo,
    salary,
    travellingDaily,
    farewell,
    travelling,
    dfarewell,
    epf8,
    etfContribution,
    netpaid,
    totalSalaryExpense,
    req.body.attendingDays,
    req.body.date,
    monthName,
    additions,
    deductions,
    contributionTotal,
  ];

  DB.connection.promise()
    .query(q, values)
    .then(() => {
      res.json("Payment details added successfully");
    })
    .catch((error) => {
      console.error('Error adding payment details:', error);
      res.status(500).json({ error: 'Failed to add payment details' });
    });
});
//add loan details
app.post('/loans', (req, res) => {
  const q = "INSERT INTO Loans (`empNo`, `employeeName`,`amount`, `interestRate`, `duration` ) VALUES (?)";
  const values = [
    req.body.empNo,
    req.body.employeeName,
    req.body.amount,
    req.body.interestRate,
    req.body.duration,
    
  ];

  DB.connection.promise().query(q, [values])
    .then(([results]) => {
      res.json("Loan added successfully");
    })
    .catch((error) => {
      console.error('Error inserting loan:', error);  
      res.status(500).json({ error: 'Failed to insert loan' });
    });
});
//add overtime details
app.post('/overtimes', (req, res) => {
  const q = "INSERT INTO overtimes (empNo,employeeName,date, hours, rate,  payment) VALUES (?, ?, ?, ?, ?, ?)";
  const rate = parseFloat(req.body.rate);
  const hours = parseFloat(req.body.hours);
  const payment = rate * hours;

  const values = [
    req.body.empNo,
    req.body.employeeName,
    req.body.date,
    hours,
    rate,
    payment,
  ];

  DB.connection.promise().query(q, values)
    .then(([results]) => {
      res.json("Overtime added successfully");
    })
    .catch((error) => {
      console.error('Error adding overtime:', error);
      res.status(500).json({ error: 'Failed to add overtime' });
    });
});
//add leave details
app.post('/leaves', (req, res) => {
  const q = "INSERT INTO leaves (empNo, employeeName,date, leaveHours, description ) VALUES (?, ?, ?, ?, ?)";
  const values = [
    req.body.empNo,
    req.body.employeeName,
    req.body.date,
    req.body.leaveHours,
    req.body.description,
    
  ];
  DB.connection.promise().query(q, values)
    .then(([results]) => {
      res.json("Leave added successfully");
    })
    .catch((error) => {
      console.error('Error adding leave:', error);
      res.status(500).json({ error: 'Failed to add leave' });
    });
});
//add company
app.post('/companies', (req, res) => {
  const q = "INSERT INTO companies (`companyName`) VALUES (?)";
  const values = [
    req.body.companyName,
  ];
  DB.connection.promise().query(q, [values])
    .then(([results]) => {
      res.json("Company added successfully");
    })
    .catch((error) => {
      console.error('Error inserting company:', error);
      res.status(500).json({ error: 'Failed to insert company' });
    });
});
// add user
app.post('/users', (req, res) => {
  const q = "INSERT INTO users (`username`, `password`, `role`) VALUES (?)";
  const values = [
    req.body.username,
    req.body.password,
    req.body.role,
  ];
  DB.connection.promise().query(q, [values])
    .then(([results]) => {
      res.json("User added successfully");
    })
    .catch((error) => {
      console.error('Error inserting user:', error);
      res.status(500).json({ error: 'Failed to insert user' });
    });
});


// Update details to database
//update employee details
app.put('/employees/:id', (req, res) => {
  const q = "UPDATE employees SET firstName = ?, lastName = ?, fullName = ?, title = ?, maritalStatus = ?, gender = ?, dob = ?, nic = ?, phone = ?, currentAddress = ?, country = ?, zipCode = ?,companyName = ?, department = ?, designation = ?, joinedDate = ?, employeeType = ?, workShift = ?, payGrade = ?, payType = ?,accountName = ?, accountNo = ?, bankName= ?, bankNo = ?, branchName = ? , branchNo= ? WHERE id = ?";
  const values = [
    req.body.firstName,
    req.body.lastName,
    req.body.fullName,
    req.body.title,
    req.body.maritalStatus,
    req.body.gender,
    req.body.dob,
    req.body.nic,
    req.body.phone,
    req.body.currentAddress,
    req.body.country,
    req.body.zipCode,
    req.body.companyName,
    req.body.department,
    req.body.designation,
    req.body.joinedDate,
    req.body.employeeType,
    req.body.workShift,
    req.body.payGrade,
    req.body.payType,
    req.body.accountName,
    req.body.accountNo,
    req.body.bankName,
    req.body.bankNo,
    req.body.branchName,
    req.body.branchNo,
    req.params.id
  ];

  DB.connection.promise().query(q, values)
    .then(([results]) => {
      res.json("Employee updated successfully");
    })
    .catch((error) => {
      console.error('Error updating employee:', error);
      res.status(500).json({ error: 'Failed to update employee' });
    });
});
//update payment details
app.put('/payments/:id', (req, res) => {
  const q = "UPDATE payments SET salary = ?, travellingDaily = ?, farewell = ?, travelling = ?, dfarewell = ?, epf8 = ?, etfContribution = ?, netpaid = ?, totalSalaryExpense = ?, attendingDays = ?, date = ? WHERE id = ?";
  const salary = parseFloat(req.body.salary);
  const travellingDaily = parseFloat(req.body.travellingDaily);
  const farewell = parseFloat(req.body.farewell);
  const travelling = parseFloat(req.body.travelling);
  const dfarewell = parseFloat(req.body.dfarewell);
  const epf8 = salary * 0.08;
  const etfContribution = salary * 0.12;
  const netpaid = salary + travellingDaily + farewell + travelling - dfarewell - epf8 - etfContribution;
  const totalSalaryExpense = netpaid + epf8 + etfContribution;
  
  
  const values = [
    salary,
    travellingDaily,
    farewell,
    travelling,
    dfarewell,
    epf8,
    etfContribution,
    netpaid,
    totalSalaryExpense,
    req.body.attendingDays,
    req.body.date,
    req.params.id
  ];

  DB.connection.promise().query(q, [...values,req.params.id])
    .then(([results]) => {
      res.json("Payment details updated successfully");
    })
    .catch((error) => {
      console.error('Error updating payment details:', error);
      res.status(500).json({ error: 'Failed to update payment details' });
    });
});
// update  loan details 
app.put('/loans/:id', (req, res) => {
  const q = "UPDATE loans SET  empNo  = ?, employeeName = ?, amount = ?,  interestRate = ?, duration = ?  WHERE id = ?";
  const values = [
    req.body.empNo,
    req.body.employeeName,
    req.body.amount,
    req.body.interestRate,
    req.body.duration,
   
  ];
  DB.connection.promise().query(q, [...values,req.params.id])
    .then(([results]) => {
      res.json("Employee updated successfully");
    })
    .catch((error) => {
      console.error('Error updating employee:', error);
      res.status(500).json({ error: 'Failed to update employee' });
    });
});
// update overtime details
app.put('/overtimes/:id', (req, res) => {
  const rate = parseFloat(req.body.rate);
  const hours = parseFloat(req.body.hours);
  const payment = rate * hours;
  const q = "UPDATE overtimes SET hours = ?, date = ?, rate = ?, empno = ?, employeeName = ?, payment = ?  WHERE id = ?";
  const values = [
    hours,
    req.body.date,
    rate,
    req.body.empNo,
    req.body.employeeName,
    payment,
  ];
  DB.connection.promise().query(q, [...values,req.params.id])
    .then(([results]) => {
      res.json("Overtime updated successfully");
    })
    .catch((error) => {
      console.error('Error updating overtime:', error);
      res.status(500).json({ error: 'Failed to update overtime' });
    });
});
// update leave details
app.put('/leaves/:id', (req, res) => {
  const q = "UPDATE leaves SET date = ?, description = ?, leaveHours = ?, empNo = ?, employeeName = ? WHERE id = ?";
  const values = [
    req.body.date,
    req.body.description,
    req.body.leaveHours,
    req.body.empNo,
    req.body.employeeName,
    req.params.id,
  ];
  DB.connection.promise().query(q, [...values,req.params.id])
    .then(([results]) => {
      res.json("Leave updated successfully");
    })
    .catch((error) => {
      console.error('Error updating leave:', error);
      res.status(500).json({ error: 'Failed to update leave' });
    });
});
// update company details
app.put('/companies/:id', (req, res) => {
  const q = "UPDATE companies SET companyName = ? WHERE id = ?";
  const values = [
    req.body.companyName,
  
  ];
  DB.connection.promise().query(q, [...values,req.params.id])
    .then(([results]) => {
      res.json("Company updated successfully");
    })
    .catch((error) => {
      console.error('Error updating company:', error);
      res.status(500).json({ error: 'Failed to update company' });
    });
});
//update user details
app.put('/users/:id', (req, res) => {
  const q = "UPDATE users SET username = ?, role = ?  WHERE id = ?";
  const values = [
    req.body.username,
    req.body.role,
  ];
  DB.connection.promise().query(q, [...values,req.params.id])
    .then(([results]) => {
      res.json("User updated successfully");
    })
    .catch((error) => {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Failed to update user' });
    })
  });


//Delete details to database
//delete employee details
app.delete('/employees/:id', (req, res) => {
  const employeeId = req.params.id;
  
  const q = `
    DELETE * FROM employees WHERE id = ?;
  `;
  
  DB.connection.promise().query(q, [employeeId])
    .then(([results]) => {
      res.json("Employee and related details deleted successfully");
    })
    .catch((error) => {
      console.error('Error deleting employee and related details:', error);
      res.status(500).json({ error: 'Failed to delete employee and related details' });
    });
});
//delete payment details
app.delete('/payments/:id', (req, res) => {
  const paymentId = req.params.id;

  const q = "DELETE * FROM payments WHERE id = ?";
  DB.connection.promise().query(q, [paymentId])
    .then(([results]) => {
      res.json("Payment details deleted successfully");
    })
    .catch((error) => {
      console.error('Error deleting payment details:', error);
      res.status(500).json({ error: 'Failed to delete payment details' });
    });
});
//delete loan details
app.delete('/loans/:id', (req, res) => {
  const q = "DELETE FROM loans WHERE id = ?";
  const values = [req.params.id];
  DB.connection.promise().query(q, [values])
    .then(([results]) => {
      res.json("Employee deleted successfully");
    })
    .catch((error) => {
      console.error('Error deleting employee:', error);
      res.status(500).json({ error: 'Failed to delete employee' });
    });
});
//delete overtime details
app.delete('/overtimes/:id', (req, res) => {
  const q = "DELETE FROM overtimes WHERE id = ?";
  const values = [req.params.id];
  DB.connection.promise().query(q, [values])
    .then(([results]) => {
      res.json("Overtime deleted successfully");
    })
    .catch((error) => {
      console.error('Error deleting overtime:', error);
      res.status(500).json({ error: 'Failed to delete overtime' });
    });
});
//delete leave details  
app.delete('/leaves/:id', (req, res) => { 
  const q = "DELETE FROM leaves WHERE id = ?";
  const values = [req.params.id];
  DB.connection.promise().query(q, values)

    .then(([results]) => {
      res.json("Leave deleted successfully");
    })
    .catch((error) => {
      console.error('Error deleting leave:', error);
      res.status(500).json({ error: 'Failed to delete leave' });
    });
});
//delete company
app.delete('/companies/:id', (req, res) => {
  const q = "DELETE FROM companies WHERE id = ?";
  const values = [req.params.id];
  DB.connection.promise().query(q, values)
    .then(([results]) => {
      res.json("Company deleted successfully");
    })
    .catch((error) => {
      console.error('Error deleting company:', error);
      res.status(500).json({ error: 'Failed to delete company' });
    });
});
//delete user
app.delete('/users/:id', (req, res) => {
  const q = "DELETE FROM users WHERE id = ?";
  const values = [req.params.id];
  DB.connection.promise().query(q, values)
    .then(([results]) => {
      res.json("User deleted successfully");
    })
    .catch((error) => {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Failed to delete user' });
    });
})


app.get('/combinedData', async (req, res) => {
  try {
    const query = `
      SELECT p.id,
       p.empNo, p.epfNo, p.employeeName, p.salary, p.travellingDaily, 
        p.farewell, p.travelling, p.dfarewell, p.epf8, p.etfContribution, p.netpaid, 
        p.totalSalaryExpense, p.attendingDays, p.date, p.monthName, p.additions, p.deductions,p.contributionTotal,
        SUBSTRING(e.fullName, 1, 20) AS displayName,
        e.maritalStatus, e.gender, e.dob, e.nic, e.designation, e.joinedDate, e.department, 
        e.currentAddress, e.phone, LPAD(e.accountNo, 12, '0') AS accountNo, e.bankName,e.bankNo, e.branchName, e.branchNo, e.companyName
      FROM payments AS p
      JOIN employees AS e ON p.empNo = e.empNo
    `;

    const [results] = await DB.connection.promise().query(query);
    res.json(results);
  } catch (error) {
    console.error('Error retrieving combined data:', error);
    res.status(500).json({ error: 'Failed to retrieve combined data' });
  }
});


//serch employee details
app.get('/api/employees', (req, res) => {
  const searchTerm = req.query.search;

  // Execute the database query
  DB.connection.promise().query('SELECT * FROM employees WHERE fullname LIKE ?', [`%${searchTerm}%`])
    .then(([results]) => {
      const employees = results.map((employee) => ({
        id: employee.id,
        empNo: employee.empNo,
        fullName: employee.fullName,
        maritalStatus: employee.maritalStatus,
        gender: employee.gender,
        dob : employee.dob,
        designation: employee.designation,
        joinedDate: employee.joinedDate,
        department: employee.department,
        currentAddress: employee.currentAddress,
        phone: employee.phone,

      }));
      res.json(employees);
    })
    .catch((error) => {
      console.error('Error performing database query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});


//new close

app.get('/api/loans', (req, res) => {
  const searchTerm = req.query.search;

  // Execute the database query
  DB.connection.promise().query('SELECT * FROM loans WHERE employeeName LIKE ?', [`%${searchTerm}%`])
    .then(([results]) => {
      const loans = results.map((loan) => ({
        id: loan.id,
        amount: loan.amount,
        interestRate: loan.interestRate,
        duration: loan.duration,
        employeeId: loan.employeeId,
        employeeName: loan.employeeName,
      }));
      res.json(loans);
    })
    .catch((error) => {
      console.error('Error performing database query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

app.get('/api/payments', (req, res) => {
  const searchTerm = req.query.search;

  // Execute the database query
  DB.connection.promise().query('SELECT * FROM payments WHERE employeeName LIKE ?', [`%${searchTerm}%`])
    .then(([results]) => {
      const payments = results.map((payment) => ({
        id: payment.id,
        employeeId: payment.employeeId,
        employeeName: payment.employeeName,
        salary: payment.salary,
        travellingDaily: payment.travellingDaily,
        farewell: payment.farewell,
        travelling: payment.travelling,
        dfarewell: payment.dfarewell,
        epf8: payment.epf8,
        etfContribution: payment.etfContribution,
        netpaid: payment.netpaid,
        totalSalaryExpense: payment.totalSalaryExpense,
        attendingDays: payment.attendingDays,
      }));
      res.json(payments);
    })
    .catch((error) => {
      console.error('Error performing database query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

//pie chart
app.get('/graph2', (req, res) => {
  DB.connection.promise().query('SELECT department, COUNT(*) AS employeeCount FROM employees GROUP BY department')
    .then(([results]) => {
      const departments = results.map((result) => ({
        department: result.department,
        employeeCount: result.employeeCount,
      }));
      res.json(departments);
    })
    .catch((error) => {
      console.error('Error retrieving departments:', error);
      res.status(500).json({ error: 'Failed to retrieve departments' });
    });
});

//bar chart
app.get('/graph3', (req, res) => {
  DB.connection.promise().query('SELECT department, SUM(amount) AS totalLoanAmount FROM loans JOIN employees ON loans.empNo = employees.empNo GROUP BY department')
    .then(([results]) => {
      const departments = results.map((result) => ({
        department: result.department,
        totalLoanAmount: result.totalLoanAmount,
      }));
      res.json(departments);
    })
    .catch((error) => {
      console.error('Error retrieving departments:', error);
      res.status(500).json({ error: 'Failed to retrieve departments' });
    });
});

//column chart
app.get('/graph1', (req, res) => {
  const leaveHourNames = {
    2:'Short leave',
    4: 'Half Day',
    8: 'Full Day', 
    16: 'Two days',
    24: 'Three days',
  };
  DB.connection.promise()
    .query('SELECT leaveHours, COUNT(*) AS employeeCount FROM leaves GROUP BY leaveHours')
    .then(([results]) => {
      const leaves = results.map((result) => ({
        leaveHours: leaveHourNames[result.leaveHours] || result.leaveHours, // Use the mapped name if available, otherwise use the original value
        employeeCount: result.employeeCount,
      }));
      res.json(leaves);
    })
    .catch((error) => {
      console.error('Error retrieving leaves:', error);
      res.status(500).json({ error: 'Failed to retrieve leaves' });
    });
});

//line chart
app.get('/graph4', (req, res) => {
  DB.connection.promise().query('SELECT date, COUNT(*) AS employeeCount FROM overtimes GROUP BY date')
    .then(([results]) => {
      const leaves = results.map((result) => ({
        date: result.date,
        employeeCount: result.employeeCount,
      }));
      res.json(leaves);
    })
    .catch((error) => {
      console.error('Error retrieving leaves:', error);
      res.status(500).json({ error: 'Failed to retrieve leaves' });
    });
});
  
//employee count
app.get('/employeecount', (req, res) => {
  DB.connection.promise().query('SELECT COUNT(*) AS employeeCount FROM employees')
    .then(([results]) => {
      const employeeCount = results[0].employeeCount;
      res.json({ employeeCount });
    })
    .catch((error) => {
      console.error('Error retrieving employee count:', error);
      res.status(500).json({ error: 'Failed to retrieve employee count' });
    });
});

app.get('/loanamount', (req, res) => {
  DB.connection.promise().query('SELECT COALESCE(SUM(amount), 0) AS loanAmount FROM loans')
    .then(([results]) => {
      const amount = results[0].loanAmount;
      const loanAmount = `Rs. ${amount}`;

      res.json({ loanAmount });
    })
    .catch((error) => {
      console.error('Error retrieving loan amount:', error);
      res.status(500).json({ error: 'Failed to retrieve loan amount' });
    });
});

app.get('/totalovertime', (req, res) => {
  DB.connection.promise()
    .query('SELECT SUM(hours) AS totalOvertime FROM overtimes;')
    .then(([results]) => {
      const totalOvertimeDecimal = results[0].totalOvertime;
      const hours = Math.floor(totalOvertimeDecimal);
      const minutes = Math.round((totalOvertimeDecimal % 1) * 60);
      const totalOvertime = `${hours} Hours ${minutes} Minutes`;
      res.json({ totalOvertime });
    })
    .catch((error) => {
      console.error('Error retrieving totalOvertime:', error);
      res.status(500).json({ error: 'Failed to retrieve totalOvertime' });
    });
});

app.put('/loans/:id', (req, res) => {
  const q = "UPDATE loans SET amount = ?,  interestRate = ?, duration = ?, employeeId  = ?, employeeName = ?  WHERE id = ?";
  const values = [
    req.body.amount,
    req.body.interestRate,
    req.body.duration,
    req.body.employeeId,
    req.body.employeeName,
  ];
  DB.connection.promise().query(q, [...values,req.params.id])
    .then(([results]) => {
      res.json("Employee updated successfully");
    })
    .catch((error) => {
      console.error('Error updating employee:', error);
      res.status(500).json({ error: 'Failed to update employee' });
    });
});

 //serch 2
app.get('/api/loans', (req, res) => {
  const searchTerm = req.query.search;

  // Execute the database query
  DB.connection.promise().query('SELECT * FROM loans WHERE employeeName LIKE ?', [`%${searchTerm}%`])
    .then(([results]) => {
      const loans = results.map((loan) => ({
        id: loan.id,
        amount: loan.amount,
        interestRate: loan.interestRate,
        duration: loan.duration,
        employeeId: loan.empNo,
        employeeName: loan.employeeName,
      }));
      res.json(loans);
    })
    .catch((error) => {
      console.error('Error performing database query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

//overtime 

app.put('/overtimes/:id', (req, res) => {
  const rate = parseFloat(req.body.rate);
  const hours = parseFloat(req.body.hours);
  const payment = rate * hours;
  const q = "UPDATE overtimes SET hours = ?, date = ?, rate = ?, employeeId  = ?, employeeName = ?, payment = ?  WHERE id = ?";
  const values = [
    hours,
    req.body.date,
    rate,
    req.body.employeeId,
    req.body.employeeName,
    payment,
  ];
  DB.connection.promise().query(q, [...values,req.params.id])
    .then(([results]) => {
      res.json("Overtime updated successfully");
    })
    .catch((error) => {
      console.error('Error updating overtime:', error);
      res.status(500).json({ error: 'Failed to update overtime' });
    });
});

//serch 3
app.get('/api/overtimes', (req, res) => {
  const searchTerm = req.query.search;

  // Execute the database query
  DB.connection.promise().query('SELECT * FROM overtimes WHERE employeeName LIKE ?', [`%${searchTerm}%`])
    .then(([results]) => {
      const overtimes = results.map((overtime) => ({
        id: overtime.id,
        hours: overtime.hours,
        rate: overtime.rate,
        date: overtime.date,
        employeeId: overtime.employeeId,
        employeeName: overtime.employeeName,
        payment: `Rs ${overtime.payment}`,

      }));
      res.json(overtimes);
    })
    .catch((error) => {
      console.error('Error performing database query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

//serch 4

app.get('/api/leaves', (req, res) => {
  const searchTerm = req.query.search;

  // Execute the database query

  DB.connection.promise().query('SELECT * FROM leaves WHERE employeeName LIKE ?', [`%${searchTerm}%`])
    .then(([results]) => {
      const leaves = results.map((leave) => ({
        id: leave.id,
        date: leave.date,
        description: leave.description,
        leaveHours: leave.leaveHours,
        employeeId: leave.employeeId,
        employeeName: leave.employeeName,
      }));
      res.json(leaves);
    })
    .catch((error) => {
      console.error('Error performing database query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

app.get('/totalleaves', (req, res) => {
  DB.connection.promise()
    .query('SELECT SUM(leaveHours) AS totalLeaves FROM leaves;')
    .then(([results]) => {
      const totalLeavesDecimal = results[0].totalLeaves;
      const hours = Math.floor(totalLeavesDecimal);
      const minutes = Math.round((totalLeavesDecimal % 1) * 60);
      const totalLeaves = `${hours} Hours ${minutes} Minutes`;
      res.json({ totalLeaves });
    })
    .catch((error) => {
      console.error('Error retrieving totalLeaves:', error);
      res.status(500).json({ error: 'Failed to retrieve totalLeaves' });
    });
});
app.listen(8081, () => {
  console.log('Server started on port 8081');
});
