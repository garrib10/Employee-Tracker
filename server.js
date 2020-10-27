var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  // Your username// 
  user: "root",
  // Add password at end// 
  password: "",
  database: "employee_db"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  start();
});

function start() {
  inquirer
    .prompt
}




function viewEmployee() {

}

function AddEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is the employee's first name?"
      },
      {
        type: 'input',
        name: "last_name",
        message: "What is the employee's last name?",
      },
      {
        type: "input",
        name: "role_id",
        message: "What is the employee's role ID?",
      },
      {
        type: "number",
        name: "manager_id",
        message: "What is the employee's manager ID?",
      }
    ])
    .then(function (res) {
      connection.query(
        "INSERT into employee SET?",
        {
          first_name: res.first_name,
          last_name: res.last_name
        },
        function (err) {
          if (err) throw err;
          console.log("Employee has been succesfully added.");
          start();
        }
      );

    });
}

function deleteEmployee() {

}

function viewDepartment() {

}

function addDepartment() {

}

function removeDepartment() {

}

function updateRole() {

}


  // TO DO LIST// 
  // Use Inquirer to make a prompt//
  // What Do you want to do// 
  // View Department, Employee, Roles// 
  // Add Department, Employee, Roles// 
  // Update Employee (delete employee, or update roles)/