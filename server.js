// --------- IMPORTING -----------

// import dotenv to hide credentials
require('dotenv').config();

// import console.table
const consoleTable = require('console.table');
// import inquirer
const inquirer = require('inquirer');

// import the db
const db = require('./config/connection');

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
                new inquirer.Separator(), // viewing by all
                "View all departments", 
                "View all roles",
                "View all employees",

                new inquirer.Separator(), // viewing by particulars
                "View employees by manager",
                "View employees by department",

                new inquirer.Separator(), // adding
                "Add a department",
                "Add a role",
                "Add an employee",

                new inquirer.Separator(), // updating
                "Update an employee's role",
                "Update an employee's manager",

                new inquirer.Separator(), // exiting app
                new inquirer.Separator(), // extra formatting
                "Exit",
                new inquirer.Separator(),
            ]
        })
        .then(answers => {
            switch (answers.action) {
                // view by all
                case "View all departments":
                    viewAllDepartments();
                    break;
                case "View all roles":
                    viewAllRoles();
                    break;
                case "View all employees":
                    viewAllEmployees();
                    break;
                // view by particulars
                case "View employees by manager":
                    viewEmployeesByManager();
                    break;
                case "View employees by department":
                    viewEmployeesByDepartment();
                    break;
                // adding
                case "Add a department":
                    addNewDepartment();
                    break;
                case "Add a role":
                    addNewRole();
                    break;
                case "Add an employee":
                    addNewEmployee();
                    break;
                // updating
                case "Update an employee's role":
                    updateEmployeeRole();
                    break;
                case "Update an employee's manager":
                    updateEmployeeManager();
                    break;
                // exiting app
                default:
                    exitApp();
                    break;
            }
        })
        .catch(err => console.log(err));
}


// ---------- VIEWING ------------

const viewAllDepartments = () => {
    // sql query
    const viewDepartmentTable = `
        SELECT 
            department.id AS "Department ID",
            department.department_name AS "Department Name"
        FROM department;
    `;

    db.query(viewDepartmentTable, (err, results) => {
        // error handling
        if (err) console.log(err);
        // successful result:
        console.table(`\nDepartments`, results);
        // return to main screen
        showMenu();
    });
}

const viewAllRoles = () => {
    // sql query
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

    db.query(viewRolesTable, (err, results) => {
        // error handling
        if (err) console.log(err);
        // successful result:
        console.table(`\nRoles`, results);
        // return to main screen
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

    db.query(viewEmployeesTable, (err, results) => {
        // error handling
        if (err) console.log(err);
        // successful result:
        console.table(`\nEmployees`, results);
        // return to main screen
        showMenu();
    });
}



// ---- VIEW BY PARTICULARS


const viewEmployeesByManager = () => {
    // get managers
    let managersList = []; // empty array to fill up

    // database querying to find managers
    db.query(`SELECT * FROM employee`, (err, results) => {
        // error handling
        if (err) console.log(err);

        // for results:
        results.forEach(result => {
            // destructure each result
            const { 
                id, first_name, last_name, manager_id 
            } = result;

            // find all the managers (manager_id = null)
            if (manager_id === null) {
                // make a manager object
                let manager = {
                    name: `${first_name} ${last_name}`,
                    value: id
                }
                // push the managers into the list array
                managersList.push(manager);
            }
        });
        managersList.push(new inquirer.Separator()); // formatting

        // create questions to ask
        questions = [
            {
                type: "list",
                name: "manager",
                message: "Select the manager whose team you wish to view:",
                choices: managersList // managers go here
            }
        ];

        // ask questions to user
        inquirer.prompt(questions)
            .then(answers => {
                // print databse results to table in terminal

                // sql query
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

                // sql parameters
                const managerId = answers.manager;

                // query the database using sql and params
                db.query(viewManagersTeam, managerId, (err, results) => {
                    // error handling
                    if (err) console.log(err);

                    // if no employees under selected manager
                    if (results.length === 0) {
                        // special message
                        console.log(`\nThere are no employees under this manager.\n`);
                        // return to main screen
                        return showMenu();
                    }

                    // get the manager's name
                    const managerName = results[0].Manager;

                    // make table
                    console.table(`\nEmployees under ${managerName}`, results);
                    // return to main screen
                    showMenu();                    
                });
            })
            .catch(err => console.log(err));
    });
}


const viewEmployeesByDepartment = () => {
    // get departments
    let departmentChoices = []; // empty array to fill up

    db.query(`SELECT * FROM department`, (err, results) => {
        // error handling
        if (err) console.log(err);

        // grab values for each result
        results.forEach(result => {
            const { id, department_name } = result;
            // push to departments array
            departmentChoices.push({
                name: department_name,
                value: id
            });
        });

        // make questions
        questions = [
            {
                type: "list",
                name: "department",
                message: "Select the department whose employees you wish to view:",
                choices: departmentChoices // departments here
            }
        ];

        // ask user the questions
        inquirer.prompt(questions)
            .then(answers => {
                // print db results to table in terminal 

                // sql query
                const viewDeptEmployees = `
                    SELECT
                        e.id AS "Employee ID",
                        CONCAT(e.first_name, " ", e.last_name) AS "Employee",
                        role.title AS "Role",
                        department.department_name AS "Department"
                    FROM department
                    LEFT JOIN role
                        ON role.department_id = department.id
                    LEFT JOIN employee e
                        ON e.role_id = role.id
                    WHERE department.id = ?;
                `;

                // sql params
                const deptId = answers.department;

                // get results out of db
                db.query(viewDeptEmployees, deptId, (err, results) => {
                    // error handling
                    if (err) console.log(err);

                    // results: 

                    // get department name
                    const deptName = results[0].Department;

                    // get first employee name record
                    const firstEmployee = results[0].Employee;

                    // if there are no employees in a dept
                    if (!firstEmployee) {
                        // show special message
                        console.log(`\nThere are no employees in the ${deptName} department.\n`);
                        // return to main screen
                        return showMenu();
                    }
                    // make table for results
                    console.table(`\nEmployees in ${deptName}`, results);
                    // return to main screen
                    showMenu();
                });
            })
            .catch(err => console.log(err));
    });
}

// ----------- ADDING ------------

const addNewDepartment = async () => {
    // set questions
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

    // ask user questions
    inquirer.prompt(questions)
        .then(answers => {
            // sql query
            const insertIntoDept = `
                INSERT INTO department (department_name)
                VALUES (?);
            `;
            // sql params
            const deptValues = answers.departmentName;

            db.query(insertIntoDept, deptValues, (err, results) => {
                // error handling
                if (err) console.log(err);

                // successful results
                console.log(`\nSuccessfully added ${deptValues} to the database.\n`);
                // return to main screen
                showMenu();
            });
        })
        .catch(err => console.log(err));
}

const addNewRole = () => {
    // get department list
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
    });

    // set questions
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

    // ask user questions
    inquirer.prompt(questions)
        .then(answers => {
            // sql
            const insertIntoRole = `
                INSERT INTO role (title, salary, department_id)
                VALUES (?, ?, ?);
            `;
            // sql parameters
            const roleValues = [
                answers.title,
                answers.salary,
                answers.department
            ];
        
            db.query(insertIntoRole, roleValues, (err, results) => {
                // error handling
                if (err) console.log(err);

                // successful result:
                console.log(`\nSuccessfully added ${roleValues[0]} to the database.\n`);
                // return to main screen
                showMenu();
            });
        })
        .catch(err => console.log(err));
}

const addNewEmployee = () => {
    // grab roles and managers
    let roleChoices = [];
    let managerChoices = [];

    // start db query for getting role
    db.query(`SELECT * FROM role`, (err, results) => {
        if (err) console.log(err);

        results.forEach(result => {
            const { id, title } = result;
            // set role object
            let role = {
                name: title,
                value: id
            };
            roleChoices.push(role); // add role to array
        });
        // add separator for formatting
        roleChoices.push(new inquirer.Separator());
    });

    // start db query for getting manager
    db.query(`SELECT * FROM employee`, (err, results) => {
        // error handling
        if (err) console.log(err);

        // for results:
        results.forEach(result => {
            // destructure each result
            const { 
                id, first_name, last_name, manager_id 
            } = result;

            // find all the managers (manager_id = null)
            if (manager_id === null) {
                // make a manager object
                let manager = {
                    name: `${first_name} ${last_name}`,
                    value: id
                }
                // push the managers into the list array
                managerChoices.push(manager);
            }
        });
        // option to give employee the lead position
        const newManager = {
            name: `N/A (Employee will be in a lead position)`,
            value: null
        };

        managerChoices.push(newManager, new inquirer.Separator()); // add new manager option and formatting
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

    // ask user questions
    inquirer.prompt(questions)
        .then(answers => {
            // sql query
            const insertIntoEmployee = `
                INSERT INTO employee (first_name, last_name, role_id, manager_id)
                VALUES (?, ?, ?, ?);
            `;
            // sql parameters
            const employeeValues = [
                answers.firstName,
                answers.lastName,
                answers.roleId,
                answers.managerId
            ]
            // add into database
            db.query(insertIntoEmployee, employeeValues, (err, results) => {
                // error handling
                if (err) console.log(err);
                
                // successful result:
                console.log(`\nSuccessfully added ${employeeValues[0]} ${employeeValues[1]} to the database.\n`);
                // return to main screen
                showMenu();
            });
        })
        .catch(err => console.log(err));
}


// ----------- UPDATING ------------

const updateEmployeeRole = () => {
    // empty arrays to store employee and roles data
    let employeesList = [];
    let rolesList = [];
    
    // get employee info from database
    db.query(`SELECT * FROM employee`, (err, results) => {
        // error handling
        if (err) console.log(err);

        results.forEach(result => {
            const {
                id, first_name, last_name
            } = result;
            // create employee obj
            let employee = {
                name: `${first_name} ${last_name}`,
                value: id
            };
            employeesList.push(employee); // add to array
        });
        employeesList.push(new inquirer.Separator()); // formatting

        // get role info from database
        db.query(`SELECT * FROM role`, (err, results) => {
            // error handling
            if (err) console.log(err);

            results.forEach(result => {
                const { id, title } = result;
                // create role obj
                let role = {
                    name: `${title}`,
                    value: id
                };
                rolesList.push(role); // add to array
            });
            rolesList.push(new inquirer.Separator());
        });

        // set questions
        questions = [
            {
                type: "list",
                name: "employee",
                message: "Select the employee whose role requires updating:",
                choices: employeesList // employees here
            },
            {
                type: "list",
                name: "newRoleId",
                message: "Select their new role:",
                choices: rolesList // roles here
            }
        ];
        
        // ask user questions
        inquirer.prompt(questions)
            .then(answers => {
                // print results to table in terminal 

                // sql query
                const updateRole = `
                    UPDATE employee
                    SET role_id = ?
                    WHERE id = ?;
                `;
                // sql parameters
                const newRoleValues = [
                    answers.newRoleId,
                    answers.employee
                ];

                db.query(updateRole, newRoleValues, (err, results) => {
                    // error handling
                    if (err) console.log(err)
                    
                    // successful result:
                    console.log(`\nSuccessfully updated role.\n`);
                    // return to main screen
                    showMenu();
                });
            })
            .catch(err => console.log(err)); 
    });
}

const updateEmployeeManager = () => {
    let employeesList = [];
    let managersList = [];

    db.query(`SELECT * FROM employee`, (err, results) => {
        if (err) console.log(err);

        results.forEach(result => {
            const { 
                id, first_name, last_name, manager_id 
            } = result;

            // create employee obj
            let employee = {
                name: `${first_name} ${last_name}`,
                value: id
            }
            // add employees to list
            employeesList.push(employee);

            // if they are a manager, add to manager list
            if (manager_id === null) {
                managersList.push(employee);
            }
        });
        employeesList.push(new inquirer.Separator()); // formatting

        // if you want to change someone to be a manager
        const promotedToManager = {
            name: `N/A (This person is now in a lead position)`,
            value: null,
        }
        managersList.push(promotedToManager, new inquirer.Separator()); // add promoted object and formatting

        // set questions
        questions = [
            {
                type: "list",
                name: "employee",
                message: "Select the employee requiring reassignment of their manager:",
                choices: employeesList // employees here
            }, 
            {
                type: "list",
                name: "newManagerId",
                message: "Select their new manager:",
                choices: managersList // managers here
            }
        ];

        // ask users questions
        inquirer.prompt(questions)
            .then(answers => {
                // print results to table in terminal

                // sql query
                const updateManager = `
                    UPDATE employee
                    SET manager_id = ?
                    WHERE id = ?;
                `;
                // sql parameters
                const newManagerValues = [
                    answers.newManagerId,
                    answers.employee
                ];

                db.query(updateManager, newManagerValues, (err, results) => {
                    // error handling
                    if (err) console.log(err);

                    // successful result:
                    console.log(`\nSuccessfully updated manager.\n`);
                    // return to main screen:
                    showMenu();
                });
            })
            .catch(err => console.log(err));
    });            
}


// ----------- MENU -----------

// function to exit the app
const exitApp = () => {
    // exit message
    console.log("\nThank you for using the Employee Tracker application.\n")
    // end db connection
    db.end();
    // exit application
    process.exit();

}

// show menu screen
const showMenu = () => {
    return init();
}

// ---------- INIT -------------

// initialise the app
const init = () => {
    chooseWhatToDo(); // present list of action questions
}

// start the app!
init();