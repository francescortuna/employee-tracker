const inquirer = require("inquirer");
const Query = require("./lib/query");

// Menu
const menu = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "request",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Exit Application"
        ],
      },
    ])
    .then(({ request }) => {
      // Deconstructing user request
      switch (request) {
        case "View all departments":
          viewDepartments();
          break;
        case "View all roles":
          viewRoles();
          break;
        case "View all employees":
          viewEmployees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Exit Application":
          console.log("Thanks for using application!");
          break;
      }
    });
};

const viewDepartments = async () => {
  const viewDepQueryReq = "SELECT * FROM department";
  const viewDepQuery = new Query(viewDepQueryReq);
  let results = await viewDepQuery.logQuery();
  menu();
}

const viewRoles = async () => {
  const viewRoleQueryReq = `SELECT role.id, role.title, role.salary, department.name 'department' 
  FROM role
  JOIN department ON role.department_id = department.id`;
  const viewRoleQuery = new Query(viewRoleQueryReq);
  let results = await viewRoleQuery.logQuery();
  menu();
}

const viewEmployees = async () => {
  const viewEmployeeQueryReq = `SELECT e.id, e.first_name 'first name', e.last_name 'last name', 
  role.title 'job title', role.salary, department.name 'department', CONCAT(m.first_name,' ', m.last_name) 'manager'
  FROM employee e
  JOIN role ON e.role_id = role.id
  JOIN department ON role.department_id = department.id
  LEFT JOIN employee m ON e.manager_id = m.id`;
  const viewEmployeeQuery = new Query(viewEmployeeQueryReq);
  let results = await viewEmployeeQuery.logQuery();
  menu();
}

const add = async (objectName) => {
  let results = await objectName.addQuery();
  menu();
}

const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "departmentName",
        message: "Please input department name",
      },
    ])
    .then(({ departmentName }) => {
      const addDepartmentQueryReq = `INSERT INTO department (name)
      VALUE ("${departmentName}")`;
      const addDepartmentQuery = new Query(addDepartmentQueryReq);
      add(addDepartmentQuery);
    });
};

const addRole = async () => {
  getDepartmentsQuery = new Query();
  let departments = await getDepartmentsQuery.getDepartment();
  inquirer
    .prompt([
      {
        type: "input",
        name: "roleName",
        message: "Please enter role name",
      },
      {
        type: "number",
        name: "salary",
        message: "Please enter salary",
      },
      {
        type: "list",
        name: "department",
        message: "Please choose what department the role is in",
        choices: departments,
      },
    ])
    .then(({ roleName, salary, department }) => {
      let departmentId = departments.indexOf(`${department}`) + 1;
      const addRoleQueryReq = `INSERT INTO role (title, salary, department_id)
      VALUE  ("${roleName}", ${salary}, ${departmentId});`;
      const addRoleQuery = new Query(addRoleQueryReq);
      add(addRoleQuery);
    });
};

const addEmployee = async () => {
  getRolesQuery = new Query();
  let roles = await getRolesQuery.getRole();
  let employees = await getRolesQuery.getEmployee();
  employees.push("None");
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "Enter the employee's first name",
      },
      {
        type: "input",
        name: "lastName",
        message: "Enter the employee's last name",
      },
      {
        type: "list",
        name: "employeeRole",
        message: "Choose employee's role",
        choices: roles,
      },
      {
        type: "list",
        name: "employeeManager",
        message: "Choose employee's manager",
        choices: employees,
      },
    ])
    .then(({ firstName, lastName, employeeRole, employeeManager }) => {
      let roleId = roles.indexOf(`${employeeRole}`) + 1;

      const employeesFirstNameArray = employees.map((fullName) => {
        return fullName.split(" ")[0];
      });
      let employeeManagerFirstName = employeeManager.split(" ")[0];
      if (employeeManager == "None") {
        managerId = null;
      } else {
        managerId =
          employeesFirstNameArray.indexOf(`${employeeManagerFirstName}`) + 1;
      }

      const addEmployeeQueryReq = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
      VALUE  ("${firstName}", "${lastName}", ${roleId}, ${managerId})`;
      const addEmployeeQuery = new Query(addEmployeeQueryReq);
      add(addEmployeeQuery);
    });
};

menu();
