const inquirer = require("inquirer");
const Query = require("./lib/query");

// Main Menu
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
          "Update an employee manager",
          "View employees by manager",
          "View employees by department",
          "Delete a department",
          "Delete a role",
          "Delete an employee",
          "View total utilized budget of a department",
          "Exit Application"
        ],
      },
    ])
    .then(({ request }) => {
      // Deconstructing user request
      switch (request) {
        case "View all departments":
          const viewDepQueryReq = "SELECT * FROM department";
          const viewDepQuery = new Query(viewDepQueryReq); // Creates new Query object using query request
          view(viewDepQuery);
          break;
        case "View all roles":
          const viewRoleQueryReq = `SELECT role.id, role.title, role.salary, department.name 'department' 
          FROM role
          JOIN department ON role.department_id = department.id`;
          const viewRoleQuery = new Query(viewRoleQueryReq); // Creates new Query object using query request
          view(viewRoleQuery);
          break;
        case "View all employees":
          const viewEmployeeQueryReq = `SELECT e.id, e.first_name 'first name', e.last_name 'last name', role.title 'job title', role.salary, department.name 'department', CONCAT(m.first_name,' ', m.last_name) 'manager'
          FROM employee e
          JOIN role ON e.role_id = role.id
          JOIN department ON role.department_id = department.id
          LEFT JOIN employee m ON e.manager_id = m.id`;
          const viewEmployeeQuery = new Query(viewEmployeeQueryReq); // Creates new Query object using query request
          view(viewEmployeeQuery);
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
        case "Update an employee role":
          updateEmployeeRole();
          break;
        case "Update an employee manager":
          updateEmployeeManager();
          break;
        case "View employees by manager":
          viewEmployeesByManager();
          break;
        case "View employees by department":
          viewEmployeesByDept();
          break;
        case "Delete a department":
          deleteDept();
          break;
        case "Delete a role":
          deleteRole();
          break;
        case "Delete an employee":
          deleteEmployee();
          break;
        case "View total utilized budget of a department":
          viewTotalBudget();
          break;
        case "Exit Application":
          console.log("Thanks for using application!");
          break;
      }
    });
};

const view = async (objectName) => {
  let results = await objectName.logQuery(); // Waits for object to run its function
  menu(); // Goes back to main menu
}

const viewEmployeesByManager = async () => {
  getEmployeesQuery = new Query();
  let employees = await getEmployeesQuery.getEmployee(); // Gets array of employees
  employees.unshift("No manager"); // Adds "No manager" to beginning of array
  inquirer
    .prompt([
      {
        type: "list",
        name: "manager",
        message: "Please choose what manager you would like to view employees by",
        choices: employees
      }
    ])
    .then(({ manager }) => {
      if (manager == "No manager") {
        managerIdQuery = `IS NULL`; // If employee has no manager, managerId is null
      } else {
        const employeesFirstNameArray = employees.map((fullName) => {
          return fullName.split(" ")[0]; // Saves first name of each employee to new array
        });
        let managerFirstName = manager.split(" ")[0]; // Gets first name of manager
        managerId = employeesFirstNameArray.indexOf(`${managerFirstName}`); // Finds index using first name of manager
        managerIdQuery = `= ${managerId}`;
      }
      const viewEmployeeQueryReq = `SELECT e.id, e.first_name 'first name', e.last_name 'last name', role.title 'job title', role.salary, department.name 'department', CONCAT(m.first_name, ' ', m.last_name) 'manager'
    FROM employee e
      JOIN ROLE ON e.role_id = role.id
      JOIN department ON role.department_id = department.id
      LEFT JOIN employee m ON e.manager_id = m.id
    WHERE e.manager_id ${managerIdQuery}`
    const viewEmployeeQuery = new Query(viewEmployeeQueryReq);
    view(viewEmployeeQuery);
    })
}

const viewEmployeesByDept = async () => {
  getDeptsQuery = new Query();
  let depts = await getDeptsQuery.getDepartment();
  inquirer
    .prompt([
      {
        type: "list",
        name: "dept",
        message: "Please choose what department you would like to view employees by",
        choices: depts
      }
    ])
    .then(({ dept }) => {
      let departmentId = depts.indexOf(`${dept}`) + 1;
      const viewEmployeeQueryReq = `SELECT e.id, e.first_name 'first name', e.last_name 'last name', role.title 'job title', role.salary, department.name 'department', CONCAT(m.first_name, ' ', m.last_name) 'manager'
      FROM employee e
      JOIN ROLE ON e.role_id = role.id
      JOIN department ON role.department_id = department.id
      LEFT JOIN employee m ON e.manager_id = m.id
      WHERE role.department_id = ${departmentId}`;
      const viewEmployeeQuery = new Query(viewEmployeeQueryReq);
      view(viewEmployeeQuery);
    })
}

const update = async (objectName) => {
  let results = await objectName.updateQuery(); // Waits for object to run its function
  menu(); // Goes back to main menu
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
      const addDepartmentQuery = new Query(addDepartmentQueryReq); // Creates new Query object using query request
      update(addDepartmentQuery); // Passes object through add function
    });
};

const addRole = async () => {
  getDepartmentsQuery = new Query(); // Creates new Query object
  let departments = await getDepartmentsQuery.getDepartment(); // Gets array of departments
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
      let departmentId = departments.indexOf(`${department}`) + 1; // Finds index of chosen department to use as department ID
      const addRoleQueryReq = `INSERT INTO role (title, salary, department_id)
      VALUE  ("${roleName}", ${salary}, ${departmentId});`;
      const addRoleQuery = new Query(addRoleQueryReq); // Creates new Query object using query request
      update(addRoleQuery); // Passes object through update function
    });
};

const addEmployee = async () => {
  getRolesQuery = new Query();
  let roles = await getRolesQuery.getRole(); // Gets array of roles
  let employees = await getRolesQuery.getEmployee(); // Gets array of employees
  employees.unshift("None"); // Adds "None" to beginning of array
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
      let roleId = roles.indexOf(`${employeeRole}`) + 1; // Finds index of chosen role as role ID

      if (employeeManager == "None") {
        managerId = null; // If employee has no manager, managerId is null
      } else {
        const employeesFirstNameArray = employees.map((fullName) => {
          return fullName.split(" ")[0]; // Saves first name of each employee to new array
        });
        let employeeManagerFirstName = employeeManager.split(" ")[0]; // Gets first name of manager
        managerId = employeesFirstNameArray.indexOf(`${employeeManagerFirstName}`); // Finds index using first name of manager
      }

      const addEmployeeQueryReq = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
      VALUE  ("${firstName}", "${lastName}", ${roleId}, ${managerId})`;
      const addEmployeeQuery = new Query(addEmployeeQueryReq); // Creates new Query object using query request
      update(addEmployeeQuery); // Passes object through update function
    });
};

const updateEmployeeRole = async() => {
  getEmployeesQuery = new Query();
  let employees = await getEmployeesQuery.getEmployee();
  let roles = await getEmployeesQuery.getRole();
  inquirer
    .prompt([
      {
        type: "list",
        name: "employee",
        message: "Which employee would you like to update?",
        choices: employees
      },
      {
        type: "list",
        name: "newRole",
        message: "Choose the employee's updated role",
        choices: roles
      }
    ])
    .then(({ employee, newRole }) => {
      let roleId = roles.indexOf(`${newRole}`) + 1;

      const employeesFirstNameArray = employees.map((fullName) => {
        return fullName.split(" ")[0];
        });
      let employeeFirstName = employee.split(" ")[0];
      let employeeId = employeesFirstNameArray.indexOf(`${employeeFirstName}`) + 1;

      const updateEmployeeQueryReq = `UPDATE employee
      SET role_id = ${roleId}
      WHERE id = ${employeeId}`;
      const updateEmployeeQuery = new Query(updateEmployeeQueryReq); // Creates new Query object using query request
      update(updateEmployeeQuery); // Passes object through update function
    })
}

const updateEmployeeManager = async() => {
  getEmployeesQuery = new Query();
  let employees = await getEmployeesQuery.getEmployee();
  let managers = await getEmployeesQuery.getEmployee();
  managers.unshift('None');
  inquirer
    .prompt([
      {
        type: "list",
        name: "employee",
        message: "Which employee would you like to update?",
        choices: employees
      },
      {
        type: "list",
        name: "newManager",
        message: "Choose the employee's updated manager",
        choices: managers
      }
    ])
    .then(({ employee, newManager }) => {
      const employeesFirstNameArray = employees.map((fullName) => {
        return fullName.split(" ")[0];
        });
      let employeeFirstName = employee.split(" ")[0];
      let employeeId = employeesFirstNameArray.indexOf(`${employeeFirstName}`) + 1;

      if (newManager == "None") {
        managerId = null;
      } else {
        let managerFirstName = newManager.split(" ")[0];
        managerId = employeesFirstNameArray.indexOf(`${managerFirstName}`) + 1;
      }

      const updateEmployeeQueryReq = `UPDATE employee
      SET manager_id = ${managerId}
      WHERE id = ${employeeId}`;
      const updateEmployeeQuery = new Query(updateEmployeeQueryReq); // Creates new Query object using query request
      update(updateEmployeeQuery); // Passes object through update function
    })
}

const deleteDept = async () => {
  getDeptsQuery = new Query();
  let depts = await getDeptsQuery.getDepartment();
  inquirer
    .prompt([
      {
        type: "list",
        name: "dept",
        message: "Choose which department you'd like to delete",
        choices: depts
      }
    ])
    .then(({ dept }) => {
      let deptId = depts.indexOf(`${dept}`) + 1;
      const deleteDeptQueryReq = `DELETE FROM department
      WHERE id = ${deptId}`;
      deleteDeptQuery = new Query(deleteDeptQueryReq);
      update(deleteDeptQuery);
    })
}

const deleteRole = async () => {
  getRolesQuery = new Query();
  let roles = await getRolesQuery.getRole();
  inquirer
    .prompt([
      {
        type: "list",
        name: "role",
        message: "Choose which role you'd like to delete",
        choices: roles
      }
    ])
    .then(({ role }) => {
      let roleId = roles.indexOf(`${role}`) + 1;
      const deleteRoleQueryReq = `DELETE FROM role
      WHERE id = ${roleId}`;
      deleteRoleQuery = new Query(deleteRoleQueryReq);
      update(deleteRoleQuery);
    })
}

const deleteEmployee = async () => {
  getEmployeesQuery = new Query();
  let employees = await getEmployeesQuery.getEmployee();
  inquirer
    .prompt([
      {
        type: "list",
        name: "employee",
        message: "Choose which employee you'd like to delete",
        choices: employees
      }
    ])
    .then(({ employee }) => {
      let employeeId = employees.indexOf(`${employee}`) + 1;
      const deleteEmployeeQueryReq = `DELETE FROM employee
      WHERE id = ${employeeId}`;
      deleteEmployeeQuery = new Query(deleteEmployeeQueryReq);
      update(deleteEmployeeQuery);
    })
}

const viewTotalBudget = async () => {
  getDeptsQuery = new Query();
  let depts = await getDeptsQuery.getDepartment();
  inquirer
    .prompt([
      {
        type: "list",
        name: "dept",
        message: "Choose which department you'd like to see the total utilized budget for",
        choices: depts
      }
    ])
    .then(({ dept }) => {
      let deptId = depts.indexOf(`${dept}`) + 1;
      const viewBudgetDeptQueryReq = `SELECT SUM(salary) 'Total Salaries in ${dept} Department'
      FROM (
        SELECT role.salary
        FROM employee
          JOIN ROLE ON employee.role_id = role.id
        WHERE
          role.department_id = ${deptId}) employees_by_dept`;
      viewBudgetDeptQuery = new Query(viewBudgetDeptQueryReq);
      view(viewBudgetDeptQuery);
    })
}

menu();
