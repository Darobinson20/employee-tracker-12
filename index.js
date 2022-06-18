// Packages needed
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');



// Create connection to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'Kakashi314*',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );

  db.connect(function(err){
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
  db.query(query, (err, res) => {
    if (err) throw err;

    console.log(res.length + 'employees');
    console.table(' View All Employees', res);
    promptUser();
  })
}

function viewAllRoles() {
  var query = 'SELECT * FROM roles';
  db.query(query, (err, res) => {
    if (err) throw err;
    
    console.log(res.length + 'roles');
    console.table('View All Roles', res);
    promptUser();
  })
}


function viewAllDepartments() {
  var query = 'SELECT * FROM department';
  db.query(query, (err, res) => {
    if (err) throw err;
    
    console.log(res.length + 'department');
    console.table('View All Departments', res);
    promptUser();
  })
}

//create prompts too add employee
const addEmployee = async () => {


  inquirer.prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'What is employees first name?',
    
    },
    {   
    type: 'input',
      name: 'last_name',
      message: 'What is employees last name?',
    },
    {
      type: 'list',
      name: 'rolesId',
      message: 'What is the employees role?',
      choices: [
        'Sales Lead',
        'Salesperson',
        'Lead Engineer',
        'Software Engineer',
        'Account Manager',
        'Legal Team Lead',
        'Lawyer'

      ],
    },
    {
      type: 'list',
      name: 'manager_id',
      message: 'Who is the employees manager?',
      choices: [1,3,5,7],
    },
    {
      type: 'list',
      name: 'roles_id',
      message: 'What is their role id?',
      choices: [2,4,6,8],
    }
  ])
  .then((data) => {
    db.query(
      `INSERT INTO employee (first_name, last_name, roles_id, manager_id)
      VALUES (?,?,?,?)`,
      (params = [
        data.first_name,
        data.last_name,
        data.roles_id,
        data.manager_id,
      ])
    )

  
var query = 'SELECT * FROM employee';
    db.query(query, (err, rows) => {
      if (err) throw err;
      console.log("Added Employee.");
      console.table(rows);
      promptUser();
    })
  })
}
   

 

promptUser();
