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
    console.log(`Connected to the ${process.env.DB_NAME} database.\n`)
);

// const { departmentQuestions,
//         roleQuestions 
//       } = require('./src/addQuestions');

// ---------- global VARIABLES ----------

let questions = [];

// ---------- Initial INQUIRER ----------


const chooseWhatToDo = () => {
    return inquirer.prompt(
        {
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: [
                new inquirer.Separator(),
                "View all departments", 
                "View all roles",
                "View all employees",
                new inquirer.Separator(),

                "View employees by manager",
                "View employees by department",
                new inquirer.Separator(),

                "Add a department",
                "Add a role",
                "Add an employee",
                new inquirer.Separator(),

                "Update an employee's role",
                "Update an employee's manager",
                new inquirer.Separator(),

                new inquirer.Separator(),
                "Exit",
                new inquirer.Separator(),
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

                case "View employees by manager":
                    viewEmployeesByManager();
                    break;

                case "View employees by department":
                    viewEmployeesByDepartment();
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
                case "Update an employee's manager":
                    updateEmployeeManager();
                    break;
                default:
                    exitApp();
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

const viewEmployeesByManager = () => {
    let managersList = [];

    db.query(`SELECT * FROM employee`, (err, results) => {
        if (err) console.log(err);

        results.forEach(result => {
            if (result.manager_id === null) {
                managersList.push({
                    name: `${result.first_name} ${result.last_name}`,
                    value: result.id
                });
            }
        });  
        // console.log(managersList);

        questions = [
            {
                type: "list",
                name: "manager",
                message: "Select the manager whose team you wish to view:",
                choices: managersList
            }
        ];

        inquirer.prompt(questions)
            .then(answers => {
                // console.log(answers);

                const viewManagersTeam = `
                SELECT
                    e.id AS "Employee ID",
                    CONCAT(e.first_name, " ", e.last_name) AS "Employee Name",
                    IFNULL(CONCAT(m.first_name, " ", m.last_name), "Manager") AS "Manager"
                FROM employee e
                LEFT JOIN employee m
                    ON e.manager_id = m.id
                WHERE m.id = ?;
                `;

                const managerId = answers.manager;

                db.query(viewManagersTeam, managerId, (err, results) => {
                    if (err) console.log(err);

                    console.table(`\nTeam by Manager`, results);
                    showMenu();
                })

            });
    });
}

const viewEmployeesByDepartment = () => {
    let departmentChoices = [];

    db.query(`SELECT * FROM department`, (err, results) => {
        results.forEach(result => {
            departmentChoices.push({
                name: result.department_name,
                value: result.id
            });
        });
        // console.log(departmentChoices);

        questions = [
            {
                type: "list",
                name: "department",
                message: "Select the department whose employees you wish to view:",
                choices: departmentChoices
            }
        ];

        inquirer.prompt(questions)
            .then(answers => {
                const viewDeptEmployees = `
                    SELECT
                        department.id AS "Dept ID",
                        department.department_name AS "Department",
                        CONCAT(e.first_name, " ", e.last_name) AS "Employee",
                        role.title AS "Role"
                    FROM department
                    LEFT JOIN role
                        ON role.department_id = department.id
                    LEFT JOIN employee e
                        ON e.role_id = role.id
                    WHERE department.id = ?;
                `;

                const deptId = answers.department;

                db.query(viewDeptEmployees, deptId, (err, results) => {
                    if (err) console.log(err);

                    console.table(`\nEmployees in Department`, results);
                    showMenu();
                });

                // console.log(answers);
            });
    });
}

// ----------- ADDING ------------


const addNewDepartment = async () => {
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
            console.log(err);
        } else {
            console.log(`Successfully added ${deptValues} to the database.\n`);
            showMenu();
        }

    });
}

const addNewRole = async () => {
    let departmentChoices = [];

    db.query(`SELECT * FROM department`, (err, results) => {
        results.forEach(result => {
            let department = {                
                name: result.department_name, // 'name' is what shows up in the choices
                value: result.id // 'value' must be used in order to tie the ID into the 'name'
            };
            departmentChoices.push(department);
        });        
        departmentChoices.push(new inquirer.Separator());
        // console.log(departmentChoices);
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

    // console.log(response);

    const insertIntoRole = `
        INSERT INTO role (title, salary, department_id)
        VALUES (?, ?, ?);
    `;

    const roleValues = [
        response.title,
        response.salary,
        response.department
    ];

    db.query(insertIntoRole, roleValues, (err, result) => {
        // console.log(roleValues);

        if (err) {
            console.log(err)
        } else {
            console.log(`Successfully added ${roleValues[0]} to the database.\n`);
        }

        showMenu();
    })
}

const addNewEmployee = async () => {
    let roleChoices = [];
    let managerChoices = [];

    db.query(`SELECT * FROM role`, (err, results) => {
        // console.table(results);
        if (err) console.log(err);

        results.forEach(result => {
            let role = {
                name: result.title,
                value: result.id
            };
            roleChoices.push(role);
        });
        roleChoices.push(new inquirer.Separator());
        // console.log(roleChoices);
    });

    db.query(`SELECT * FROM employee`, (err, results) => {
        // console.log(results);

        const managers = results.filter(result => 
            result.manager_id === null
        );

        // console.log(managers);

        managers.forEach(person => {
            let manager = {
                name: `${person.first_name} ${person.last_name}`,
                value: person.id
            };
            managerChoices.push(manager);
        });

        const newManager = {
            name: `N/A (Employee will be in a lead position)`,
            value: null
        };

        managerChoices.push(newManager, new inquirer.Separator());
        // console.log(managerChoices);
    });

    questions = [
        {
            type: "input",
            name: "firstName",
            message: "First name of employee being added:",
            validate(firstName) {
                if (!firstName) {
                    return "Please enter the employee's first name.";
                }
                return true;
            }
        },
        {
            type: "input",
            name: "lastName",
            message: "Last name of employee being added:",
            validate(lastName) {
                if (!lastName) {
                    return "Please enter the employee's last name.";
                }
                return true;
            }
        },
        {
            type: "list",
            name: "roleId",
            message: "Role of employee being added:",
            choices: roleChoices
        },
        {
            type: "list",
            name: "managerId",
            message: "Direct report for employee being added:",
            choices: managerChoices
        }
    ];

    const response = await inquirer.prompt(questions);

    // console.log(response);

    const insertIntoEmployee = `
        INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES (?, ?, ?, ?);
    `;

    const employeeValues = [
        response.firstName,
        response.lastName,
        response.roleId,
        response.managerId
    ]

    db.query(insertIntoEmployee, employeeValues, (err, results) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`Successfully added ${employeeValues[0]} ${employeeValues[1]} to the database.\n`);
        }

        showMenu();
    })

}


// ----------- UPDATING ------------

const updateEmployeeRole = async () => {
    let employeesList = [];
    let rolesList = [];
    
    db.query(`SELECT * FROM employee`, (err, results) => {
        // console.table(results);
        if (err) console.log(err);

        results.forEach(result => {
            let employee = {
                name: `${result.first_name} ${result.last_name}`,
                value: result.id
            };
            employeesList.push(employee);
        });
        employeesList.push(new inquirer.Separator());
        // console.log(employeesList);

        db.query(`SELECT * FROM role`, (err, results) => {
            // console.log(results);
            if (err) console.log(err);

            results.forEach(result => {
                let role = {
                    name: `${result.title}`,
                    value: result.id
                };
                rolesList.push(role);
            });
            rolesList.push(new inquirer.Separator());
            // console.log(rolesList);
        });

        questions = [
            {
                type: "list",
                name: "employee",
                message: "Select the employee whose role requires updating:",
                choices: employeesList
            },
            {
                type: "list",
                name: "newRoleId",
                message: "Select their new role:",
                choices: rolesList
            }
        ];
        
        inquirer.prompt(questions)
            .then(answers => {
                const updateRole = `
                    UPDATE employee
                    SET role_id = ?
                    WHERE id = ?;
                `;

                const newRoleValues = [
                    answers.newRoleId,
                    answers.employee
                ];

                db.query(updateRole, newRoleValues, (err, results) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log(`Successfully updated role.\n`);
                        showMenu();
                    }
                });
            }); 
    });
}

const updateEmployeeManager = () => {
    let employeesList = [];
    let managersList = [];

    db.query(`SELECT * FROM employee`, (err, results) => {
        if (err) console.log(err);

        results.forEach(result => {
            const { id, 
                first_name, 
                last_name, 
                manager_id } = result;

            employeesList.push({
                name: `${first_name} ${last_name}`,
                value: id
            });

            if (manager_id === null) {
                managersList.push({
                    name: `${first_name} ${last_name}`,
                    value: id
                });
            }
        });
        // console.log(employeesList);
        // console.log(managersList);


        employeesList.push(new inquirer.Separator());

        const promotedToManager = {
            name: `N/A (This person is now in a lead position)`,
            value: null,
        }

        managersList.push(promotedToManager, new inquirer.Separator());


        questions = [
            {
                type: "list",
                name: "employee",
                message: "Select the employee requiring reassignment of their manager:",
                choices: employeesList
            }, 
            {
                type: "list",
                name: "newManagerId",
                message: "Select their new manager:",
                choices: managersList
            }
        ];

        inquirer.prompt(questions)
            .then(answers => {
                // console.log(answers);

                const updateManager = `
                    UPDATE employee
                    SET manager_id = ?
                    WHERE id = ?;
                `;

                const newManagerValues = [
                    answers.newManagerId,
                    answers.employee
                ];

                db.query(updateManager, newManagerValues, (err, results) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log(`Successfully updated manager.\n`);
                        showMenu();
                    };
                })
            })
    });            
}

/* can work if you put everything inside the first db query

below is the original version where everything was separated

const updateEmployeeRole = async () => {
    let employeesList = [];
    let rolesList = [];
    
    db.query(`SELECT * from employee`, (err, results) => {
        // console.table(results);

        results.forEach(result => {
            let employee = {
                name: `${result.first_name} ${result.last_name}`,
                value: result.id
            };
            employeesList.push(employee);
        });
        console.log(employeesList);
    });

    db.query(`SELECT * FROM role`, (err, results) => {
        // console.log(results);
        if (err) console.log(err);

        results.forEach(result => {
            let role = {
                name: `${result.title}`,
                value: result.id
            };
            rolesList.push(role);
        });
        console.log(rolesList);
    });

    questions = [
        {
            type: "list",
            name: "employee",
            message: "Update the role for which employee?",
            choices: employeesList
        },
        {
            type: "list",
            name: "newRole",
            message: "Assign new role to employee:",
            choices: rolesList
        }
    ];

    const response = await inquirer.prompt(questions);
}
*/


// ----------- MENU -----------

const showMenu = () => {
    return init();
}

const exitApp = () => {
    console.log("\nThank you for using the Employee Tracker application.\n")
    db.end();
    process.exit();
}

// ---------- INIT -------------

const init = () => {
    chooseWhatToDo();
}

// start the app!
init();