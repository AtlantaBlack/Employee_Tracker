// import dotenv to hide credentials
require('dotenv').config();

// import express and mysql2
const express = require("express");
const mysql = require("mysql2");

// make port variable, make express a variable
const PORT = process.env.PORT || 3001;
const app = express();

// body parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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


// start the server listening
app.listen(PORT, () => 
    console.log(`App listening on port ${PORT}!`)
);