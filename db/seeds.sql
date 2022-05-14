INSERT INTO department (department_name)
VALUES    
    ("Service"),      -- id: 1
    ("Sales"),        -- id: 2
    ("Engineering"),  -- id: 3
    ("Finance"),      -- id: 4
    ("Legal");        -- id: 5

INSERT INTO role (title, salary, department_id)
VALUES
    ("Customer Service", 75000, 1),
    ("Customer Service Manager", 90000, 1),
    ("Salesperson", 85000, 2),
    ("Sales Lead", 100000, 2),
    ("Software Engineer", 120000, 3),
    ("Lead Engineer", 150000, 3),    
    ("Accountant", 120000, 4),
    ("Chief Financial Officer", 150000, 4),
    ("Lawyer", 200000, 5),
    ("Legal Team Lead", 250000, 5);

INSERT INTO employee (first_name, last_name, role_id)
VALUES     
    ("Rey", "McSriff", 1),
    ("Anatoli", "Smorin", 1),
    ("Karl", "Dandleton", 2),
    ("Onson", "Sweemey", 3),
    ("Glenallen", "Mixon", 3),
    ("Sleve", "McDichael", 4),
    ("Darryl", "Archideld", 5),
    ("Mario", "McRlwain", 5),
    ("Dwigt", "Rortugal", 6),
    ("Dean", "Wesrey", 7),
    ("Raul", "Chamgerlain", 7),
    ("Tony", "Smehrik", 8),
    ("Bobson", "Dugnutt", 9),
    ("Mike", "Truk", 9),
    ("Willie", "Dustice", 10);

UPDATE employee 
    SET manager_id = 3 
    WHERE first_name = "Rey";

UPDATE employee 
    SET manager_id = 3 
    WHERE first_name = "Anatoli";

UPDATE employee 
    SET manager_id = 6 
    WHERE first_name = "Onson";

UPDATE employee 
    SET manager_id = 6 
    WHERE first_name = "Glenallen";

UPDATE employee 
    SET manager_id = 9 
    WHERE first_name = "Darryl";

UPDATE employee 
    SET manager_id = 9 
    WHERE first_name = "Mario";

UPDATE employee 
    SET manager_id = 12 
    WHERE first_name = "Dean";

UPDATE employee 
    SET manager_id = 12 
    WHERE first_name = "Raul";

UPDATE employee 
    SET manager_id = 15 
    WHERE first_name = "Bobson";

UPDATE employee 
    SET manager_id = 15 
    WHERE first_name = "Mike";
