
const inquirer = require('inquirer');
const mysql = require('mysql2');
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    console.log(`Connected to the ${process.env.DB_NAME} database in addQuestions`)
);



function departmentQuestions() {
    return [
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
}

// function getDepartments() {
//     db.query(`SELECT department.department_name FROM department`, (err, result) => {
//         return result;
//     });
// }

function getDepartments() {
    return new Promise((resolve, reject) => {
        db.query(`SELECT department.department_name FROM department`, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    });
}

// function compiledRoleQuestions(departmentNames) {
//     return inquirer.prompt([
//         {
//             type: "input",
//             name: "roleTitle",
//             message: "Title of role being added:",
//             validate(title) {
//                 if (!title) {
//                     return "Please enter the name of the new role.";
//                 }
//                 return true;
//             }
//         },
//         {
//             type: "input",
//             name: "roleSalary",
//             message: "Salary of role being added:",
//             validate(salary) {
//                 if (parseInt(salary) && salary >= 0) {
//                     return true;
//                 } 
//                 return "Please enter a valid number greater than (or equal to) 0.";
//             }
//         },
//         {
//             type: "list",
//             name: "department",
//             message: "Department that this role belongs to:",
//             choices: [...departmentNames, new Separator()]
//         }
//     ]);
// }

function roleQuestions(departmentNames) {
    // getDepartments()
    //     .then(departments => {
    //         let departmentNames = departments.map(name => name.department_name)
    //         // console.log(departmentNames);
    //         return departmentNames;
    //     })
    //     .then(departmentNames => {
            return [
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
                    choices: [...departmentNames, new inquirer.Separator()]
                }
            ];
        // });
        
}


module.exports = {
    departmentQuestions,
    roleQuestions
}