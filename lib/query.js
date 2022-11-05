const db = require('./connectSql');
const cTable = require('console.table');

class View {
    constructor(userQuery) {
        this.userQuery = userQuery;
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

module.exports = View;