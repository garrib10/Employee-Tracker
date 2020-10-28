var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");
var util = require("util");
var { printTable } = require("console-table-printer")
require("dotenv").config()

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  // Your username// 
  user: "root",
  // Add password at end// 
  password: process.env.MYSQLPASS,
  database: "employee_db"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  start();
});
connection.query = util.promisify(connection.query)

function start() {
  inquirer
    .prompt({
      type: 'list',
      name: 'start',
      message: "What would you like to do?",
      choices: ["View all employees","Add Employee Information", "Update Employee Information", "Delete Employee Information",
        "View All Roles", "Add Role", "Update Role", "Delete Role",
        "View Departments", "Add Departments", "Update Departments", "Remove Departments", "Exit",]
    })
    .then(function (answer) {
      switch (answer.start) {
        case "View all employees":
          return viewEmployee();
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
  connection.query("SELECT * FROM employee").then(res => {
    printTable(res);
    start();
  })
}

async function addEmployee() {
  const roles = await viewRole();

  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id
  }))
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
        type: "list",
        name: "role_id",
        message: "What is the employee's role?",
        choices: roleChoices

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
  connection.query("SELECT * FROM role").then(res => {
    printTable(res);
    start();
  })
}

async function addRole() {

  const departments = await viewDept();

  const deptChoices = departments.map(({ id, department_name}) => ({
    name: department_name,
    value: id
  }))
  //prompts for new employee info
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What is the title of this role?"

      },
      {
        type: "number",
        name: "salary",
        message: "What is the salary of this role?"
      },
      {
        type: "list",
        name: "department_id",
        message: "What is the Department??"
      }
    ])
    .then(function (res) {
      connection.query("INSERT INTO role (title,salary,department_id)",
        {
          title: res.title,
          salary: res.salary,
          department_id: res.department_id,
        },
        function (err) {
          if (err) throw err;
          console.log("Department has been succesfully added.");
          start();
        }
      );
    });
}

function updateRole() {
}

function removeRole() {

}
function viewDepts() {
 connection.query("SELECT * FROM department").then(res => {
   printTable(res);
   start();
 })

  
}

async function addDept() {

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




 
  // Use Inquirer to make a prompt// Done 
  // View Department, Employee, Roles// Done 
  // Add Department, Employee, Roles// Problem with Asynch function
  // Update Employee , Roles, Departments// 
  // Remove Department, Employee, Roles// 
  // Make sure schema.sql is working properly// Done 
  // Make sure seed.sql works properly// Updating, might add viewbyDepartment again// 
