const inquirer = require("inquirer");
const Query = require("./lib/query");
const View = require("./lib/query");

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
        ],
      },
    ])
    .then(({ request }) => {
      // Deconstructing user request
      switch (request) {
        case "View all departments":
            const viewDepQueryReq = "SELECT * FROM department";
            const viewDepQuery = new Query(viewDepQueryReq);
            viewDepQuery.logQuery();
            break;
        case "View all roles":
            const viewRoleQueryReq = `SELECT role.id, role.title, role.salary, department.name 'department' 
                    FROM role
                        JOIN department ON role.department_id = department.id`;
            const viewRoleQuery = new Query(viewRoleQueryReq);
            viewRoleQuery.logQuery();
            break;
        case "View all employees":
            const viewEmployeeQueryReq = `SELECT e.id, e.first_name 'first name', e.last_name 'last name', 
            role.title 'job title', role.salary, department.name 'department', CONCAT(m.first_name,' ', m.last_name) 'manager'
        FROM employee e
        JOIN role ON e.role_id = role.id
        JOIN department ON role.department_id = department.id
        LEFT JOIN employee m ON e.manager_id = m.id`;
            const viewEmployeeQuery = new Query(viewEmployeeQueryReq);
            viewEmployeeQuery.logQuery();
            break;
        case "Add a department":
          addDepartment();
          break;
        default:
            console.log("Please choose from list.");
            menu();
      }
    });
};

const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "departmentName",
        message: "Please input department name.",
      }
    ])
    .then(({ departmentName }) => {
      const addDepartmentQueryReq = `INSERT INTO department (name)
      VALUE ("${departmentName}")`;
      const addDepartmentQuery = new Query(addDepartmentQueryReq);
      addDepartmentQuery.addQuery();
    })
}

menu();
