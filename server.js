// import dotenv to hide credentials
require('dotenv').config();
// import mysql2
const mysql = require("mysql2");
const cTable = require('console.table');

// create the db connection using dotenv
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    console.log(`Connected to the ${process.env.DB_NAME} database`)
);

const init = () => {
    const viewDepartmentTable = `SELECT * from department`;

    db.query(viewDepartmentTable, function(err, result) {
        console.log(result);
        console.table(result);
    })
}

init();