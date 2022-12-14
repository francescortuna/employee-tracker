# Employee Tracker

## Description

- This project is a command-line application that allows business owners to organize their business.
- It uses Node, MySQL, and Inquirer to accept user input and allow the user to view and manage business departments, roles, and employees.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)

## Installation

To install the application's necessary dependencies, run:
```
npm i
```

To set-up the database, add your MySQL password in the lib/connectSql.js file.  
Use MySQL shell to run:
```
source db/schema.sql
```

To pre-populate the database with seeds, use MySQL shell to run:
```
source db/seed.sql
```

## Usage

To run the application, run:
```
node index.js
```

It will take you to a menu of options.

[Here is an example video of how it works](https://drive.google.com/file/d/1upOxZ0blncOQa9iM0e7cDxByofv1_4pK/view?usp=share_link)

## Features

- View all departments, roles, and employees
- Add departments, roles, and employees
- Update an employee's role or manager
- View employees by manager or department
- Delete departments, roles, and employees
- View total utilized budget of a department (total salaries of employees in that department)
