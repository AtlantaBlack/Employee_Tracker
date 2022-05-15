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

-- show employees by manager
SELECT
    CONCAT(e.first_name, " ", e.last_name) AS "Employee",
    CONCAT(m.first_name, " ", m.last_name) AS "Manager"
FROM employee e
LEFT JOIN employee m
    ON e.manager_id = m.id;


/* testing stuff

-- original version of show employees
SELECT
    employee.id,
    employee.first_name,
    employee.last_name,
    role.title AS employee_title,
    role.salary,
    employee.manager_id
FROM employee
JOIN role
    ON employee.role_id = role.id;


-- join employee staff to manager
SELECT
    e.id,
    CONCAT(e.first_name, " ", e.last_name) AS employee_name,
    e.manager_id,
    CONCAT(m.first_name, " ", m.last_name) AS manager_name
FROM employee e
LEFT OUTER JOIN employee m 
    ON e.manager_id = m.id;
*/

/*
-- REF: joining self-referencing tables
-- https://learnsql.com/blog/what-is-self-join-sql/
SELECT
    employee.Id,
        employee.FullName,
        employee.ManagerId,
        manager.FullName as ManagerName
FROM 
    Employees employee
JOIN  <-- this by default a 'left inner join'
    Employees manager
ON 
    employee.ManagerId = manager.Id
*/


/*
-- joining a bunch of different tables
SELECT 
    employees.id, 
    CONCAT(employees.f_name," ",employees.l_name) AS   'Full Name', 
    genders.gender_name AS 'Sex', 
    depts.dept_name AS 'Team Name', 
    pay_grades.pay_grade_name AS 'Band', 
    designations.designation_name AS 'Role' 
FROM employees 
LEFT JOIN genders 
    ON employees.gender_id = genders.id 
LEFT JOIN depts 
    ON employees.dept_id = depts.id 
LEFT JOIN pay_grades 
    ON employees.pay_grade_id = pay_grades.id 
LEFT JOIN designations 
    ON employees.designation_id = designations.id 
ORDER BY employees.id;
*/