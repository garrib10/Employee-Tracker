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
      choices: ["View all Employees", "Add Employee Information", "Update Employee Information", "Delete Employee Information",
        "View All Roles", "Add Role", "Update Employee's Role", "Delete Role",
        "View Departments", "Add Departments", "Remove Departments", "Exit",]
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
        case "Update Employee's Role":
          return updateRole();
        case "Remove Role":
          return removeRole();
        case "View Departments":
          return viewDepts();
        case "Add Departments":
          return addDept();
        case "Remove Departments":
          return removeDept();
        case "Exit":
          connection.end();
      }
    });

}




//Stop working//
function viewEmployee() {
  connection.query("SELECT * FROM employee").then(res => {
    printTable(res);
    start();
  })
}
// Need to research on Maps "Cannot read propery of map of undefined"//
async function addEmployee() {
  connection.query((query, err, results) => {
    if (err) throw err;

    inquirer.prompt([
      {
        name: "first_name",
        type: "input",
        message: "What is the employee's first name?"

      },
      {
        name: "last_name",
        type: "input",
        message: "What is the employee's last name?"
      },
      {
        name: 'role',
        type: 'input',
        message: "What is the employees department role?"

      },
      {
        name: 'manager',
        type: 'list',
        message: "What is the Manager ID?",
        choices: function () {
          let choiceArray = results(choice => choice.full_name);
          return choiceArray;
        },
      }
    ]).then((answer) => {
      connection.query(
        `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES(?, ?, 
            (SELECT id FROM roles WHERE title = ? ), 
            (SELECT id FROM (SELECT id FROM employees WHERE CONCAT(first_name," ",last_name) = ? ) AS tmptable))`, [answer.first_name, answer.last_name, answer.role, answer.manager]
      )
      start();
    })
  })


}

//Works//
function deleteEmployee() {
  connection.query("SELECT * FROM employee", (err, results) => {
    if (err) throw err;
    console.log(' ');
    console.table(('All Employees'), results)
    inquirer.prompt([
      {
        name: 'IDtoRemove',
        type: 'input',
        message: 'Enter the Employee ID of the person to remove:'
      }
    ]).then((answer) => {
      connection.query(`DELETE FROM employee where ?`, { id: answer.IDtoRemove })
      start();
    })
  })
}

//Works//
function viewRole() {
  connection.query("SELECT * FROM role").then(res => {
    printTable(res);
    start();
  })
}

async function addRole() {

  const departments = await viewDepts();
  const deptChoices = departments.map(({ id, department_name }) => ({

    name: department_name,
    value: id,
  }))

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
        message: "What is the Department??",
        choices: deptChoices
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
  query = "SELECT * FROM department";
  connection.query(query, (err, results) => {
    if (err) throw err;
    inquirer.prompt([
      {
       name: "role",
       type: "list",
       choices: function (){

       
      }
       }
    ])
  })

}
//Works//
function viewDepts() {
  connection.query("SELECT * FROM department").then(res => {
    printTable(res);
    start();
  })


}
// Works// 
async function addDept() {

  query = `SELECT department_name AS "Department" FROM department`;
  connection.query(query, (err, results) => {
    if (err) throw err;

    console.log('');
    console.table(('List of current Departments'), results);

    inquirer.prompt([
      {
        name: 'newDept',
        type: 'input',
        message: 'Enter the name of the Department to add:'
      }
    ]).then((answer) => {
      connection.query(`INSERT INTO department(department_name) VALUES( ? )`, answer.newDept)
      start();
    })
  })
}
//Works//
function removeDept() {
  query = "SELECT * FROM department";
  connection.query(query, (err, results) => {
    if (err) throw err;

    inquirer.prompt([
      {
        name: "dept",
        type: "list",
        choices: function () {
          let choiceArray = results.map(choice => choice.department_name);
          return choiceArray;
        },
        message: "Select the department to remove:"
      }
    ]).then((answer) => {
      connection.query(`DELETE FROM department
           WHERE ? `, { department_name: answer.dept })
      start();
    })
  })

}







  // Use Inquirer to make a prompt// Done 
  // View Department, Employee , Roles// Need to fix  View Employee not working for some reason// 
  // Add Department (Works), Employee, Roles// Problem with Asynch function and map 
  // Update Employee  Roles, Departments// problem with the update syntax// 
  // Remove Department (Works), Employee (Works), Roles// 
  // Make sure schema.sql is working properly// Done 
  // Make sure seed.sql works properly// Updating, might add viewbyDepartment again// 
