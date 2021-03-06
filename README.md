# Unit 12 MySQL Homework: Employee Tracker

For this assignment, we were told to make a employee tracker with node.js and mysql. We were told to make a schema.swl and seed.sql that we would put into our mysql workbench and create a database there. After that we were told to make departments,roles,and employees based off the criteria below. After that we were told to when the application is started we are suppose to view, add, and remove depending on the department, role, or employee that we choose. This assignment I found very challenging because I had several instiances where some of the code that worked before just stopped working completely which was frustrating to say the least. 

## Instructions

Design the following database schema containing three tables:



* **department**:

  * **id** - INT PRIMARY KEY
  * **name** - VARCHAR(30) to hold department name

* **role**:

  * **id** - INT PRIMARY KEY
  * **title** -  VARCHAR(30) to hold role title
  * **salary** -  DECIMAL to hold role salary
  * **department_id** -  INT to hold reference to department role belongs to

* **employee**:

  * **id** - INT PRIMARY KEY
  * **first_name** - VARCHAR(30) to hold employee first name
  * **last_name** - VARCHAR(30) to hold employee last name
  * **role_id** - INT to hold reference to role employee has
  * **manager_id** - INT to hold reference to another employee that manages the employee being Created. This field may be null if the employee has no manager
  
Build a command-line application that at a minimum allows the user to:

  * Add departments, roles, employees

  * View departments, roles, employees

  * Update employee roles

Bonus points if you're able to:

  * Update employee managers

  * View employees by manager

  * Delete departments, roles, and employees

  * View the total utilized budget of a department -- ie the combined salaries of all employees in that department

We can frame this challenge as follows:

```
As a business owner
I want to be able to view and manage the departments, roles, and employees in my company
So that I can organize and plan my business
```

How do you deliver this? Here are some guidelines:

* Use the [MySQL](https://www.npmjs.com/package/mysql) NPM package to connect to your MySQL database and perform queries.

* Use [InquirerJs](https://www.npmjs.com/package/inquirer/v/0.2.3) NPM package to interact with the user via the command-line.

* Use [console.table](https://www.npmjs.com/package/console.table) to print MySQL rows to the console. There is a built-in version of `console.table`, but the NPM package formats the data a little better for our purposes.

* You may wish to have a separate file containing functions for performing specific SQL queries you'll need to use. Could a constructor function or a class be helpful for organizing these?

* You will need to perform a variety of SQL JOINS to complete this assignment, and it's recommended you review the week's activities if you need a refresher on this.


## Minimum Requirements

* Functional application.

* GitHub repository with a unique name and a README describing the project.

* The command-line application should allow users to:

  * Add departments, roles, employees

  * View departments, roles, employees

  * Update employee roles

## Bonus

* The command-line application should allow users to:

  * Update employee managers

  * View employees by manager

  * Delete departments, roles, and employees

  * View the total utilized budget of a department -- ie the combined salaries of all employees in that department

## Screenshots ## 
<img width="801" alt="Screen Shot 2020-10-31 at 8 21 26 PM" src="https://user-images.githubusercontent.com/68867054/97792787-6e65d800-1bb9-11eb-9c10-69914f740d7a.png"> 

<img width="851" alt="Screen Shot 2020-10-31 at 8 22 48 PM" src="https://user-images.githubusercontent.com/68867054/97792795-88071f80-1bb9-11eb-8dbe-57c63e65f472.png">



## Submission on BCS

You are required to submit the following:

* URL: https://github.com/garrib10/Employee-Tracker

* Video URL: https://drive.google.com/file/d/1T9Z6kiAij5B_LtgA1oiGxZya19XPqScE/view 

- - -
© 2020 Trilogy Education Services, a 2U, Inc. brand. All Rights Reserved.
