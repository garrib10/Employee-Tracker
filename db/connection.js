var mysql = require("mysql");
var util = require("util");
require("dotenv").config()

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.MYSQLPASS,
    database: "employee_db"
});

connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);

});
connection.query = util.promisify(connection.query)

module.exports = connection;
