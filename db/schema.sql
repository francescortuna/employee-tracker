DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    -- holds department name --
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    -- holds role title --
    title VARCHAR(30),
    -- holds role salary --
    salary DECIMAL,
    -- holds reference to what department they belong to --
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    -- holds employee first name --
    first_name VARCHAR(30),
    -- holds employee last name --
    last_name VARCHAR(30),
    -- holds reference to employee role --
    role_id INT,
    -- holds reference to manager of employee or NULL if no manager --
    manager_id INT,
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE SET NULL,
    FOREIGN KEY (manager_id)
    REFERENCES employee(id)
    ON DELETE SET NULL
)