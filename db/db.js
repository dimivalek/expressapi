//const mysql = require('mysql');
const sequelize = require('sequelize');

//create db connenction
const db = new sequelize('notesapi', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    //user: "root",
    //password: "",
});
/*const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "notesapi"
});*/
//connect db
/*db.connect((err) => {
    if (err) throw err;
    console.log("MySQL Connencted");
});*/

db
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

//Initialize tables
const Notes = db.define('notes', {
    // attributes
    note: {
        type: sequelize.STRING,
        allowNull: false
    },
    name: {
        type: sequelize.STRING,
        allowNull: false
    },
     date: {
         type: sequelize.DATE,
        allowNull: false
    }
});

Notes.sync({ force: false });

const Users = db.define('users', {
    // attributes
    username: {
        type: sequelize.STRING,
        allowNull: false
    },
    password: {
        type: sequelize.STRING,
        allowNull: false
    }
});

Users.sync({ force: false });

//module.exports = db;
module.exports = { Notes, Users };
