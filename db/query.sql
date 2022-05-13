SELECT 
    department.*,
    role.title AS role,
    role.salary
FROM role
JOIN department
    ON role.department_id = department.id;

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