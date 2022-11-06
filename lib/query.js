const db = require('./connectSql');
const cTable = require('console.table');

class Query {
    constructor(userQuery) {
        this.userQuery = userQuery;
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