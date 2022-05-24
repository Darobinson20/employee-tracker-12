// Packages needed
const mysql = require('mysql2');
const inquirer = require('inquirer');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'Kakashi314*',
      database: 'inventory_db'
    },
    console.log(`Connected to the inventory_db database.`)
  );