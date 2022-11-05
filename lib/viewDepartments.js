const db = require('./connectSql');
const cTable = require('console.table');

const viewDepartments = () => {
    const userQuery = `SELECT * FROM department`;
    db.query(userQuery, (err, res) => {
        console.table(res);
    })
};

module.exports = viewDepartments;