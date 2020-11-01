const connection = require("./connection");

class DB {
    constructor() {
        this.connection = connection;
    }

    findAllDepartments() {
        return this.connection.query("SELECT * FROM department")
    }
    findAllEmployees() {
        return this.connection.query("SELECT * FROM employee")
    }
    findAllRoles() {
        return this.connection.query("SELECT * FROM role")
    }
    createDepartment(name) {
        return this.connection.query("INSERT INTO department SET ?", {
            department_name: name
        })
    }
    deleteDepartment(name) {
        return this.connection.query("DELETE FROM department WHERE ?", {
            department_name: name
        })
    }
    createRole(title, salary, department_id) {
        return this.connection.query("INSERT INTO role SET ?", {
            title: title,
            salary: salary,
            department_id: department_id
        })
    }
    deleteRole(title){
      return this.connection.query("DELETE FROM role WHERE ?", {
         title: title,
        
      })
    }
    createEmployee(firstName, lastName, role_id) {
        return this.connection.query("INSERT INTO employee SET ?", {
            first_name: firstName,
            last_name: lastName,
            role_id: role_id
        })
    }
    deleteEmployee( roleID) {
        return this.connection.query("DELETE FROM employee WHERE ?", {
             role_id: roleID
        })
    }

    listEmployeesByDepartment() {
        return this.connection.query("SELECT employee.first_name, employee.last_name, employee.role_id FROM employee")
    }

}
module.exports = new DB(connection);