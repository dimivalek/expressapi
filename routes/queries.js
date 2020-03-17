//const db = require('../db/db.js');
const jwt = require('jsonwebtoken');
const { Notes, Users } = require('../db/db.js');
module.exports = {
    selectparams: function(req, res) {

        //var sql;

        if (req.params.name == undefined && req.params.date != undefined) {
            //sql = `SELECT * FROM NOTES WHERE date = ${req.params.date}`;
            Notes.findAll({
                where: {
                    date: `${ req.params.date }`
                }
            }).then(() => {
                console.log("SELECT * FROM NOTES WHERE date");
            }).catch(err => {
                console.error('Unable to handle query:', err);
            });
        } else if (req.params.name != undefined && req.params.date == undefined) {
            //sql = `SELECT * FROM NOTES WHERE name = ${req.params.name}`;
            Notes.findAll({
                where: {
                    name: `${ req.params.name }`
                }
            }).then(() => {
                console.log("SELECT * FROM NOTES WHERE name");
            }).catch(err => {
                console.error('Unable to handle query:', err);
            });
        } else if (req.params.name != undefined && req.params.date != undefined) {
            //sql = `SELECT * FROM NOTES WHERE name = ${req.params.name} AND date=${req.params.date}`;
            Notes.findAll({
                where: {
                    name: `${ req.params.name }`,
                    date: `${ req.params.date }`
                }
            }).then(() => {
                console.log("SELECT * FROM NOTES WHERE name  AND date");
            }).catch(err => {
                res.send("Unable to handle query");
                console.error('Unable to handle query:', err);
            });
        } else {
            //sql = `SELECT * FROM NOTES`;
            Notes.findAll({ attributes: ['note', 'name', 'date'] })
            .then((data) => {
                res.json(data);
                console.log("SELECT * FROM NOTES",data);
            })
                .catch(err => {
                 res.send("Unable to handle query");
                 console.error('Unable to handle query:', err);
            });
        }
       /* db.query(sql, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });*/
    },
     insertparams: function(req, res) {
         //let sql = `INSERT INTO NOTES (note, name, date) VALUES (${req.params.note}, ${req.params.name}, ${req.params.date})`;
         const notes = Notes.build({ note: `${req.params.note}`, name: `${req.params.name}`,date: `${req.params.date}`});
         notes.save()
             .then((data) => {
                 res.json(data);
                 console.log("INSERT into notes", data);
             })
             .catch(err => {
                 res.send("Unable to handle query");
                 console.error('Unable to insert query:', err);
             });
         /* db.query(sql, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });*/
    },
    selectall: function(req, res) {
        //let sql = `SELECT * FROM NOTES;`
        Notes.findAll({ attributes: ['note', 'name', 'date'] })
            .then((data) => {
                res.json(data);
                console.log("SELECT * FROM NOTES", data);
            })
            .catch(err => {
                res.send("Unable to handle query");
                console.error('Unable to handle query:', err);
            });
        /*db.query(sql, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });*/
    },
    signup: function (req, res) {
        const user = Users.build({ username: req.body.username, password: req.body.password });
        user.save()
            .then((data) => {
                let payload = { subject: data };
                let token = jwt.sign(payload, 'secretkey');
                res.json(token);
                console.log("INSERT new user", data);
            })
            .catch(err => {
                res.send("Unable to create new user");
                console.error('Unable to create new user', err);
            });
    },
    signin: function (req, res) {
        Users.findOne({ attributes: ['username', 'password' ]})
            .then((data) => {
                let payload = { subject: data };
                let token = jwt.sign(payload, 'secretkey');
                res.json(token);
                console.log("SELECT specific user", data);
            })
            .catch(err => {
                res.send("Wrong username or password");
                console.error('No correct credentials provided', err);
            });
    }
}
