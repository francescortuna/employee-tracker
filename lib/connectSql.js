const mysql = require('mysql2');

const db = mysql.createConnection(
    {
      host: '127.0.0.1',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: '@7UELZauj',
      database: 'employee_db'
    },
    console.log(`Connected to the employee database.`)
);

module.exports = db;