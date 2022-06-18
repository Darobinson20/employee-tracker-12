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

function viewAllRoles() {
  var query = 'SELECT * FROM roles';
  connection.query(query, (err, res) => {
    if (err) throw err;
    
    console.log(res.length + 'roles');
    console.table('View All Roles', res);
    promptUser();
  })
}


function viewAllDepartments() {
  var query = 'SELECT * FROM department';
  connection.query(query, (err, res) => {
    if (err) throw err;
    
    console.log(res.length + 'department');
    console.table('View All Departments', res);
    promptUser();
  })
}

//create prompts too add employee
addEmployee = () => {
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
    }
    .then(res => {
      var first_name = res.first_name;
      var last_name = res.last_name;

      db.findAllRoles()
      .then(([rows]) => {
        var roles = rows;
        const rolesChoices = roles.map(({ id, title }) => ({
          name: title,
          value: id
        }));

        promptUser({
          type: 'list',
          name: 'rolesId',
          message: 'What is the employees role?',
          choices: rolesChoices
        })
        .then(res => {
          var rolesId = res.rolesId;

          db.findAllEmployee()
          .then(([rows]) => {
            var employee = rows;
            const managerChoices = employee.map (({ id, first_name, last_name }) => ({
              name: `${first_name} ${last_name}`,
              value: id
            }))
          })
        })
      })
    })

  ])
}

promptUser();