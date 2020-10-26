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
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    start ();
  });

  function start (){
    inquirer 
     .prompt
  }
  


 
  function viewEmployee (){

  }

  function AddEmployee (){

  }

  function deleteEmployee (){

  }

  function ViewDepartment(){

  }
  
  function addDepartment(){

  }

  function removeDepartment (){

  }

  function updateRole (){

  }
