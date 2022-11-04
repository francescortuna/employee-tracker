const inquirer = require('inquirer');

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
            console.log(`You chose to: ${request}.`);
        })
}

menu();