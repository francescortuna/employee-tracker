const db = require("./connectSql");
const cTable = require("console.table");

class Query {
  constructor(userQuery) {
    this.userQuery = userQuery;
  }

  async getDepartment() {
    let results = await new Promise((resolve, reject) => {
      db.query("SELECT name FROM department", (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });

    const departments = [];
    for (let i = 0; i < results.length; i++) {
      departments.push(results[i].name);
    }
    return departments;
  }

  async getRole() {
    let results = await new Promise((resolve, reject) => {
      db.query("SELECT title FROM role", (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });

    const roles = [];
    for (let i = 0; i < results.length; i++) {
      roles.push(results[i].title);
    }
    return roles;
  }

  async getEmployee() {
    let employeeQuery = `SELECT CONCAT(first_name, " ", last_name) 'name'
        FROM employee`;
    let results = await new Promise((resolve, reject) => {
      db.query(employeeQuery, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });

    const employees = [];
    for (let i = 0; i < results.length; i++) {
      employees.push(results[i].name);
    }

    return employees;
  }

  async updateQuery() {
    let results = await new Promise((resolve, reject) => {
        db.query(this.userQuery, (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
    });

    console.log("Database updated!");
  }

  async logQuery() {
    let results = await new Promise((resolve, reject) => {
        db.query(this.userQuery, (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
    });

    console.table(results);
  }
}

module.exports = Query;
