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
    const viewDepartmentTable = `
        SELECT 
            department.id AS "Department ID",
            department.department_name AS "Department Name"
        FROM department;
    `;

    db.query(viewDepartmentTable, (err, result) => {
        // console.log(result);
        // console.log("\n");
        console.table(`\nDepartments`, result);
        showMenu();
    });
}

const viewAllRoles = () => {
    const viewRolesTable = `
        SELECT     
            role.id AS "Role ID",
            role.title AS "Role Title",
            department.department_name AS "Department",
            role.salary AS "Salary"
        FROM role
        JOIN department
            ON role.department_id = department.id;
    `;

    db.query(viewRolesTable, (err, result) => {
        // console.log(result);
        // console.log("\n");
        console.table(`\nRoles`, result);
        showMenu();
    });
}

const viewAllEmployees = () => {
    const viewEmployeesTable = `
        SELECT 
            e.id AS "ID",
            CONCAT(e.first_name, " ", e.last_name) AS "Employee Name",
            role.title AS "Role",
            role.salary AS "Salary",
            CONCAT(m.first_name, " ", m.last_name) AS "Manager"
        FROM employee e
        LEFT JOIN role
            ON e.role_id = role.id
        LEFT OUTER JOIN employee m
            ON e.manager_id = m.id;
    `;

    db.query(viewEmployeesTable, (err, result) => {
        // console.log(result);
        // console.log("\n");
        console.table(`\nEmployees`, result);
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