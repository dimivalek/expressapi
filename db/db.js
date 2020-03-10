const mysql = require('mysql');
//create db connenction
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "notesapi"
});
//connect db
db.connect((err) => {
    if (err) throw err;
    console.log("MySQL Connencted");
});

module.exports = db;