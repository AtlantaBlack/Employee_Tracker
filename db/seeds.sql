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
