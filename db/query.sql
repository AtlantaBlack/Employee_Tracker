-- show all departments:
-- department id, department name
SELECT 
    department.id AS "Department ID",
    department.department_name AS "Department Name"
FROM department;

-- show all roles
-- role title, role id, department of role, salary
SELECT     
    role.id AS "Role ID",
    role.title AS "Role Title",
    department.department_name AS "Department",
    role.salary AS "Salary"
FROM role
JOIN department
    ON role.department_id = department.id;

-- show all employees:
-- employee id, employee name, role, salary, manager
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


-- show managers and employees only:
-- id, manager, employee
SELECT
    e.id AS "Employee ID",
    IFNULL(CONCAT(m.first_name, " ", m.last_name), "Manager") AS "Manager",
    CONCAT(e.first_name, " ", e.last_name) AS "Employee"
FROM employee e
LEFT JOIN employee m
    ON e.manager_id = m.id;

-- show employees under a particular manager:
-- id, manager, employee
SELECT
    e.id AS "Employee ID",
    CONCAT(e.first_name, " ", e.last_name) AS "Employee Name",
    IFNULL(CONCAT(m.first_name, " ", m.last_name), "Manager") AS "Manager"
FROM employee e
LEFT JOIN employee m
    ON e.manager_id = m.id
WHERE m.id = ?; -- change id to view other teams


-- show employees in all departments:
-- dept id, dept name, employee, role
SELECT
    department.id AS "Dept ID",
    department.department_name AS "Department",
    CONCAT(e.first_name, " ", e.last_name) AS "Employee",
    role.title AS "Role"
FROM department
LEFT JOIN role
    ON role.department_id = department.id
LEFT JOIN employee e
    ON e.role_id = role.id;

-- show employees in a particular department:
-- dept id, dept name, employee, role
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
WHERE department.id = ?; -- change id to view other depts