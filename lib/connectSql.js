const mysql = require('mysql2');

const db = mysql.createConnection(
    {
      host: '127.0.0.1',
      // Enter MySQL username here
      user: 'root',
      // Enter MySQL password Here
      password: '',
      database: 'employee_db'
    },
    console.log(`Connected to the employee database.`)
);

module.exports = db;