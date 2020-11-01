
var inquirer = require("inquirer");
var DB = require("./db/DB")
var { printTable } = require("console-table-printer");
const { findAllEmployees } = require("./db/DB");
require("dotenv").config()

function start() {
  inquirer.prompt([{
    type: "list",
    name: "mainMenu",
    message: "What would you like to Do?",
    choices: ["Work with Employees", "Work with Positions", "Work with Departments", "Exit"]

  }]).then(function (answers) {
    switch (answers.mainMenu) {
      case 'Work with Employees':
        Employee_Prompts();
        break;
      case 'Work with Positions':
        Role_Prompts();
        break;
      case 'Work with Departments':
        Department_Prompts();
        break;
      default:
        exit();
    }
  })
}

function Employee_Prompts() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'employeeMenu',
        message: 'What would you like to do?',
        choices: [
          'View All Employees',
          'Add Employee',
          'Remove Employee',
          'Exit',
        ],
      },
    ])
    .then((answer) => {
      switch (answer.employeeMenu) {
        case 'View All Employees':
          viewEmployees();
          break;
        case 'Add Employee':
          addEmployee();
          break;
        case 'Remove Employee':
          removeEmployee();
          break;
        default:
          exit();
      }
    });
}
function Role_Prompts() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'rolesMenu',
        message: 'What would you like to do?',
        choices: [
          'View All Positions',
          'Add a Position',
          'Remove a Position',
          'Exit',
        ],
      },
    ])
    .then((answer) => {
      switch (answer.rolesMenu) {
        case 'View All Positions':
          viewRoles();
          break;
        case 'Add a New Position':
          addRole();
          break;
        case 'Remove a Position':
          removeRole();
          break;
        default:
          exit();
      }
    });
}
function Department_Prompts() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'departmentMenu',
        message: 'What would you like to do?',
        choices: [
          'View All Departments',
          'Add a Department',
          'Remove a Department',
          'Exit',
        ],
      },
    ])
    .then((answer) => {
      switch (answer.departmentMenu) {
        case 'View All Departments':
          viewDepts();
          break;
        case 'Add a New Department':
          addDept();
          break;
        case 'Remove a Department':
          removeDept();
          break;
        default:
          exit();
      }
    });
}
//Works//
function viewEmployees() {
  console.log('Here is your full roster of employees');
  DB.findAllEmployees().then(function (response) {
    printTable(response);
    start();
  });
}
//Works//
const viewDepts = () => {
  console.log('Here are the active departments:');
  DB.findAllDepartments().then(function (res) {
    printTable(res);
    start();
  });
};
//Works//
const viewRoles = () => {
  console.log('Here are the current roles for your organization');
  DB.findAllRoles().then((data) => {
    printTable(data);
    start();
  });
};

//Stop Working?? // 
function addDept() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'departmentName',
          message: 'What is the name of the new department?',
        },
      ])
      .then(function (answer) {
        DB.createDepartment(answer.departmentName).then((response) => {
          console.log(response);
          viewDepts();
        });
      });
  };
//Stop working 
async function addRole() {
  const departments = await DB.findAllDepartments();

  const departmentChoices = departments.map(({ id, name }) => ({
    name: name,
    value: id
  }));
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'title',
        message: 'what is the title for this role?',
      },
      {
        type: 'input',
        name: 'salary',
        message: 'What is the salary for this position?',
        validate: (answer) => {
          const pass = answer.match(/^[1-9]\d*$/);
          if (pass) {
            return true;
          }
          return 'Please enter a positive number greater than zero.';
        },
      },
      {
        type: 'list',
        name: 'departmentID',
        message: 'Which department is assigned this position',
        choices: departmentChoices
      },
    ])
    .then((answers) => {
      DB.createRole(answers.title, answers.salary, answers.departmentID).then(
        function (response) {
          console.log(response);
          viewRoles();
        }
      );
    });
};
//Works//
async function addEmployee() {
  const roles = await DB.findAllRoles();
  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id
  }));

  inquirer
    .prompt([
      {
        type: 'input',
        name: 'firstName',
        message: "What is the employee's first name?",
        validate: (answer) => {
          if (answer !== '') {
            return true;
          }
          return 'Please do not leave this field blank';
        }
      },
      {
        type: 'input',
        name: 'lastName',
        message: "What is the employee's last name?",
        validate: (answer) => {
          if (answer !== '') {
            return true;
          }
          return 'Please do not leave this field blank';
        }
      },
      {
        type: 'list',
        name: 'roleID',
        message: "what is this employee's position?",
        choices: roleChoices
      }
    ])
    .then(function (answers) {
      DB.createEmployee(
        answers.firstName,
        answers.lastName,
        answers.roleID
      ).then(function (response) {
        console.log(response);
        viewEmployees();
      });
    });
};
//Works//
async function removeDept() {
  const departments = await DB.findAllDepartments();
  const departmentArray = departments.map(({ id, name }) => ({
    name: name,
    value: id
  }));
  inquirer.prompt([
    {
      name: "dept",
      type: "list",
      choices: function () {
        let departmentArray = departments.map(choice => choice.department_name);
        return departmentArray;
      },
      message: "Select the department to remove:"
    }
  ])
    .then(function (answer) {
      DB.deleteDepartment(answer.dept).then((response) => {
        console.log(response);
        viewDepts();
      });
    });
};
//Works//
async function removeEmployee() {
  const roles = await DB.findAllRoles();
  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id
  }));
  inquirer
    .prompt([
      {


        type: 'input',
        name: 'roleID',
        message: "what is this employee's role id ?",

      }
    ])
    .then(function (answers) {
      DB.deleteEmployee(
        answers.roleID).then(function (response) {
          console.log(response)
          viewEmployees();
        });
    });
};
//Works//
async function removeRole() {
  const departments = await DB.findAllDepartments();

  const departmentChoices = departments.map(({ id, name }) => ({
    name: name,
    value: id
  }));
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'title',
        message: 'what is the position you want to remove?',
      },

    ])

    .then(function (answers) {
      DB.deleteRole(
        answers.title).then(function (response) {
          console.log(response)
          viewRoles();
        });
    });
};




function exit() {
  process.exit()
}
start();





