CREATE DATABASE IF NOT EXISTS companydb;

USE companydb;

CREATE TABLE employee(
    id_employee INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) NOT NULL,
    salary INT(11) NOT NULL
    PRIMARY KEY (id_employee)
)

INSERT INTO employee VALUES
    (1,'Jonh', 1000),
    (2,'Mark', 2000),
    (3,'Held', 3000),
    (4,'Jenny', 4000);