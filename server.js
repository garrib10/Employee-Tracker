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
        case "View Employees":
          return viewEmployees();
        case "Add Employee Information":
          return addEmployee();
        case "Update Employee Information":
          return updateEmployee();
        case "Delete Employee Information":
          return deleteEmployee();
        case "View Roles":
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
        case "Remove Departments":
          return removeDept();
        case "Exit":
          connection.end();
      }
    });

}




//Stop working//
function viewEmployees() {
  connection.query("SELECT * FROM employee").then(res => {
    printTable(res);
    start();
  })
}
//Works// 
async function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter employee first name",
        name: "firstname"
      },
      {
        type: "input",
        message: "Enter employee last name",
        name: "lastname"
      },
      {
        type:"input",
        message: "What is the employee role ID",
        name:"role"
      },
       
    ])
    .then(function(answer) {
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.firstname,
          last_name: answer.lastname,
          role_id: answer.role,
          manager_id: null
        },
        function(err, answer) {
          if (err) {
            throw err;
          }
          console.table(answer);
        }
      );
      start();
    });


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

//Stop Works//
function viewRole() {
  connection.query("SELECT * FROM role").then(res => {
    printTable(res);
    start();
  })
}

async function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "enter employee title",
        name: "addtitle"
      },
      {
        type: "input",
        message: "enter employee salary",
        name: "addsalary"
      },
      {
        type: "input",
        message: "enter employee department id",
        name: "addDepId"
      }
    ])
    .then(function(answer) {
      connection.query(
        "INSERT INTO role SET ?",
        {
          title: answer.addtitle,
          salary: answer.addsalary,
          department_id: answer.addDepId
        },
        function(err, answer) {
          if (err) {
            throw err;
          }
          console.table(answer);
        }
      );
      start();
    });
}
  

 
        


function updateRole() {
}

function removeRole() {
  
}
//Works// 
function viewDepts() {
  connection.query("SELECT * FROM department").then(res => {
    printTable(res);
    start();
  })


}
//Works//
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
  // View Department(Works), Employee (Not working) , Roles(Not Working) // Need to fix  View Employee not working for some reason// 
  // Add Department (Works), Employee(Works) Roles(Works) // Problem with Asynch function and map 
  // Update Employee  Roles, 
  // Remove Department (Works), Employee (Works), Roles// 
  // Make sure schema.sql is working properly// Done 
  // Make sure seed.sql works properly// Updating, might add viewbyDepartment again// 
