const inquirer = require('inquirer');
const viewDepartments = require('./lib/viewDepartments');

// Menu
const menu = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'request',
                message: 'What would you like to do?',
                choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
            }
        ])
        .then(({ request }) => { // Deconstructing user request
            switch(request) {
                case 'View all departments':
                    viewDepartments();
                    break;
                default:
                    console.log('Please choose from list.');
                    menu();
            }
        })
}

menu();