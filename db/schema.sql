DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db; 

USE employee_db; 


--Create DEPARTMENT TABLE-- 
CREATE TABLE department ( 
  id INT NOT NULL AUTO_INCREMENT,
  department_id  VARCHAR(30) NOT NULL, 
  PRIMARY KEY (id)
 );

--CREATE ROLE TABLE-- 
CREATE TABLE role (
 id INT NOT NULL AUTO_INCREMENT,
 title VARCHAR(30) NOT NULL, 
 salary DECIMAL(10,2) NOT NULL,
 department_id INT,
 PRIMARY KEY (id)
);
--CREATE EMPLOYEE TABLE-- 
CREATE TABLE employee (
 id INT NOT NULL AUTO_INCREMENT,
 first_name VARCHAR(30) NOT NULL, 
 last_name  VARCHAR (30)NOT NULL, 
 role_id INT, 
 manager_id INT, 
 Primary KEY (id)
);