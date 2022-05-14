// -----------------------------

// import dotenv to hide credentials
require('dotenv').config();

// import mysql2
const mysql = require('mysql2');
// import console.table
const cTable = require('console.table');
// import inquirer
const inquirer = require('inquirer');

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

// -----------------------------


const chooseWhatToDo = () => {
    return inquirer
        .prompt(
        {
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: [
                "View all departments", "View all roles",
                "View all employees",
                new inquirer.Separator(),
                "Add a department",
                "Add a role",
                "Add an employee",
                new inquirer.Separator(),
                "Update an employee's role",
                new inquirer.Separator()
            ]
        })
        .then(answers => {
            switch (answers.action) {
                case "View all departments":
                    viewAllDepartments();
                    break;
                case "View all roles":
                    viewAllRoles();
                    break;
                case "View all employees":
                    viewAllEmployees();
                    break;
                case "Add a department":
                    addNewDepartment();
                    break;
                case "Add a role":
                    addNewRole();
                    break;
                case "Add an employee":
                    addNewEmployee();
                    break;
                case "Update an employee's role":
                    updateEmployeeRole();
                    break;
                default:
                    break;
            }
        })
        .catch(err => console.log(err));

}

const viewAllDepartments = () => {
    const viewDepartmentTable = `SELECT * from department`;

    db.query(viewDepartmentTable, (err, result) => {
        // console.log(result);
        // console.log("\n");
        console.table(`\nDepartments`, result);
        showMenu();
    });
}

// -----------------------------



const showMenu = () => {
    return init();
}



const init = () => {
    chooseWhatToDo();
}


init();



// const init = () => {
//     const viewDepartmentTable = `SELECT * from department`;

//     db.query(viewDepartmentTable, function(err, result) {
//         // console.log(result);
//         console.log("\n");
//         console.table(result);
//     })
// }