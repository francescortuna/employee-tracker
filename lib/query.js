const db = require('./connectSql');
const cTable = require('console.table');

class Query {
    constructor(userQuery) {
        this.userQuery = userQuery;
    }

    async getDepartment() {
        let results = await new Promise((resolve, reject) => {
            db.query('SELECT name FROM department', (err,res) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(res)
                }
            });
        });

        const departments = [];
        for(let i = 0; i<results.length; i++) {
            departments.push(results[i].name)
        }
        return departments;
    }

    addQuery() {
        db.query(this.userQuery, (err,res) => {
            if(err) {
                console.log(err)
            }
            console.log("Database updated!")
        });
    }

    logQuery() {
        db.query(this.userQuery, (err, res) => {
            if(err) {
                console.log(err)
            }
            console.table(res);
        })
    }

};

module.exports = Query;