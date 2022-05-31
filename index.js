// Packages needed
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');



// Create connection to database
const connection = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'Kakashi314*',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );

  connection.connect(function(err){
    if (err) throw err;

  })
  
  //begin prompt to present options
  const promptUser= () =>{

  inquirer.prompt ([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department']
        }
    
     
    ])
    .then((answer) => {
      console.log(answer);
      switch (answer.choice) {
        case "View All Employees":
          return viewAllEmployees();
        case "Add Employee":
          return addEmployee();
        case "Update Employee Role":
          return updateEmployeeRole();
        case "View All Roles":
          return viewAllRoles();
        case "View All Departments":
          return viewAllDepartments();
        case "Add Department":
          return addDepartment(); 
        case "Add Role":
          return addRole();          
      }
    });
  }  

function viewAllEmployees() {
  var query = 'SELECT * FROM employee';
  connection.query(query, (err, res) => {
    if (err) throw err;
    
    console.log(res.length + 'employees');
    console.table(' View All Employees', res);
    promptUser();
  })
}



promptUser();