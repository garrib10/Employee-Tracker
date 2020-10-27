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
    .prompt({
      type: 'list',
      name: 'start',
      message: "What would you like to do?",
      choices: ["View all employees", "View employees by Departments", "View employees by roles",
        "Add Employee Information", "Update Employee Information", "Delete Employee Information",
        "View All Roles", "Add Role", "Update Role", "Delete Role",
        "View Departments", "Add Departments", "Update Departments", "Remove Departments", "Exit",]
    })
    .then(function (answer) {
      switch (answer.start) {
        case "View all employees":
          return viewEmployee();
        case " View Employees by Department":
          return viewbyDept();
        case "Add Employee Information":
          return addEmployee();
        case "Update Employee Information":
          return updateEmployee();
        case "Delete Employee Information":
          return deleteEmployee();
        case "View All Roles":
          return viewRole();
        case "Add Role":
          return addRole();
        case "Update Role":
          return updateRole();
        case "Remove Role":
          return removeRole();
        case "View Departments":
          return viewDepts();
        case "Add Departments":
          return addDept();
        case "Update Departments":
          return updateDept();
        case "Remove Departments":
          return removeDept();
        case "Exit":
          connection.end();
      }
    });

}





function viewEmployee() {

}

function viewbyDept() {

}

function addEmployee() {
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
        message: "What is the employee's last name?"
      },
      {
        type: "input",
        name: "role_id",
        message: "What is the employee's role ID?"
      },
      {
        type: "number",
        name: "manager_id",
        message: "What is the employee's manager ID?"
      }
    ])
    .then(function (res) {
      connection.query(
        "INSERT INTO employee SET?",
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

function updateEmployee() {

}

function deleteEmployee() {

}

function viewRole() {

}

function addRole() {

}

function updateRole() {

}

function removeRole() {

}
function viewDepts() {

}

function addDept() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "What kind of department would you like to add?"
      }
    ])
    .then(function (res) {
      connection.query("INSERT INTO department (name)",
        {
          department: res.department,
        },
        function (err) {
          if (err) throw err;
          console.log("Department has been succesfully added.");
          start();
        }
      );
    });
}

function updateDept() {

}

function removeDept() {

}




  // TO DO LIST// 
  // Use Inquirer to make a prompt//
  // What Do you want to do// 
  // View Department, Employee, Roles// 
  // Add Department, Employee, Roles// 
  // Update Employee (delete employee, or update roles)/