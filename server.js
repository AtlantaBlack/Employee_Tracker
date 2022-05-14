// --------- IMPORTING -----------

// import dotenv to hide credentials
require('dotenv').config();

// import mysql2
const mysql = require('mysql2');
// import console.table
const consoleTable = require('console.table');
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

const { departmentQuestions,
        roleQuestions 
      } = require('./src/addQuestions');

// ---------- global VARIABLES ----------

let questions = [];

// ---------- Initial INQUIRER ----------


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
                    askDepartmentQuestions();
                    break;
                case "Add a role":
                    askRoleQuestions();
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


// ---------- VIEWING ------------

const viewAllDepartments = () => {
    const viewDepartmentTable = `
        SELECT 
            department.id AS "Department ID",
            department.department_name AS "Department Name"
        FROM department;
    `;

    db.query(viewDepartmentTable, (err, result) => {
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
        console.table(`\nEmployees`, result);
        showMenu();
    });
}

// ----------- ADDING ------------


const askRoleQuestions = async () => {
    let departmentChoices = [];

    db.query(`SELECT * FROM department`, (err, results) => {
        results.forEach(result => {
            let department = {                
                id: result.id,
                name: result.department_name
            };
        // departmentChoices.push(result.department_name);
        departmentChoices.push(department);
        });        
        departmentChoices.push(new inquirer.Separator());
        console.log(departmentChoices);
    });

    // questions = roleQuestions(departmentNames);

    questions = [
            {
                type: "input",
                name: "title",
                message: "Title of role being added:",
                validate(title) {
                    if (!title) {
                        return "Please enter the name of the new role.";
                    }
                    return true;
                }
            },
            {
                type: "input",
                name: "salary",
                message: "Salary of role being added:",
                validate(salary) {
                    if (parseInt(salary) && salary > 0) {
                        return true;
                    } else if (parseInt(salary) === 0) {
                        return true;
                    }
                    return "Please enter a valid number greater than (or equal to) 0.";
                }
            },
            {
                type: "list",
                name: "department",
                message: "Department that this role belongs to:",
                choices: departmentChoices
            }
        ];

    const response = await inquirer.prompt(questions);

    console.log(response);

    const insertIntoRole = `
        INSERT INTO role (title, salary, department_id)
        VALUES
            (?)
    `;

    const roleValues = {
        title: response.title,
        salary: response.salary,
        department_id: response.department
    };

    db.query(insertIntoRole, roleValues, (err, result) => {
        if (err) console.log(err);
        console.log(result);

        showMenu();
    })
    
        // .then(answers => {
        //     const insertIntoRole = `
        //         INSERT INTO role (title, salary, department_id)
        //         VALUES
        //             (?),
        //     `;
        //     const roleValues = [
        //         answers.roleTitle, 
        //         answers.roleSalary, 
        //         answers.department
        //     ];

        //     db.query(insertIntoRole, roleValues, (err, result) => {
        //         if (err) {
        //             console.log(result);
        //         } else {
        //             console.log(`Successfully added ${roleValues[0]} to the database.\n`);
        //             showMenu();
        //         }

        //     });
        // });

    // questions = await roleQuestions();

    // const response = await inquirer.prompt(questions);

    // return response;

    // roleQuestions()
    //     .then(answers => console.log(answers));

    // questions.then(console.log(answers));
    
    // return new Promise((resolve, reject) => {
    //     inquirer.prompt(questions)
    //         .then(answers => {
    //             console.log(answers);
    //             resolve(answers);
    //         });
    // })

    // return stuff = await inquirer.prompt(questions)
    //     .then(answers => {

    //         console.log(answers);




    //  return inquirer.prompt(questions)
        // .then(answers => {
            // const insertIntoRole = `
            //     INSERT INTO role (title, salary, department_id)
            //     VALUES
            //         (?),
            // `;
            // const roleValues = [answers.roleTitle, answers.roleSalary, answers.department];

            // db.query(insertIntoRole, roleValues, (err, result) => {
            //     if (err) {
            //         console.log(result);
            //     } else {
            //         console.log(`Successfully added ${roleValues[0]} to the database.\n`);
            //         showMenu();
            //     }

            // });
        // });
}

const askDepartmentQuestions = async () => {
    // questions = departmentQuestions();

    questions = [
        {
            type: "input",
            name: "departmentName",
            message: "Name of department being added:",
            validate(answer) {
                if (!answer) {
                    return "Please enter a department name.";
                }
                return true;
            }
        }
    ];

    const response = await inquirer.prompt(questions)

    const insertIntoDept = `
        INSERT INTO department (department_name)
        VALUES (?);
    `;
    const deptValues = response.departmentName;

    db.query(insertIntoDept, deptValues, (err, result) => {
        if (err) {
            console.log(result);
        } else {
            console.log(`Successfully added ${deptValues} to the database.\n`);
            showMenu();
        }

    });

    // return inquirer.prompt(questions)
    //     .then(answers => {
    //         const insertIntoDept = `
    //             INSERT INTO department (department_name)
    //             VALUES (?);
    //         `;
    //         const deptValues = answers.departmentName;

    //         db.query(insertIntoDept, deptValues, (err, result) => {
    //             if (err) {
    //                 console.log(result);
    //             } else {
    //                 console.log(`Successfully added ${deptValues} to the database.\n`);
    //                 showMenu();
    //             }

    //         });
    //     });
}



// ----------- MENU -----------


const showMenu = () => {
    return init();
}

// ---------- INIT -------------

const init = () => {
    chooseWhatToDo();
}

// start the app!
init();