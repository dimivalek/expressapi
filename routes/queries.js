const db = require('../db/db.js');

module.exports = {
    selectparams: function(req, res) {

        var sql;

        if (req.params.name == undefined && req.params.date != undefined) {
            sql = `SELECT * FROM NOTES WHERE date = ${req.params.date}`;
        } else if (req.params.name != undefined && req.params.date == undefined) {
            sql = `SELECT * FROM NOTES WHERE name = ${req.params.name}`;
        } else if (req.params.name != undefined && req.params.date != undefined) {
            sql = `SELECT * FROM NOTES WHERE name = ${req.params.name} AND date=${req.params.date}`;
        } else {
            sql = `SELECT * FROM NOTES`;
        }
        db.query(sql, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
    },
     insertparams: function(req, res) {
        let sql = `INSERT INTO NOTES (note, name, date) VALUES (${req.params.note}, ${req.params.name}, ${req.params.date})`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
    },
    selectall: function(req, res) {
        let sql = `SELECT * FROM NOTES;`
        db.query(sql, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
    }
}
