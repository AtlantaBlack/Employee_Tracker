# Employee Management System
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

The Employee Management System application is a content management system. Users are able to view the departments, roles, and employees within an organisation, as well as add and update sections.

## Table of Contents

1. [Technologies Used](#technologies-used)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Demo](#demo)
5. [Screenshots](#screenshots)
6. [License](#license)
7. [Resources](#resources)
8. [Contact](#contact)

## Technologies Used

This application uses the following technologies:

* JavaScript
* Node.js
* Inquirer
* MySQL 2
* console.table

## Installation

This application uses Node.js, Inquirer, MySQL 2, and dotenv, and will require installation of these packages to run. Users will also be required to create their own .env file to enable them to connect to the database using their local machine.

First, clone the [Employee Management System repository](https://github.com/AtlantaBlack/Employee_Tracker) or download the repository to your machine. Then, using Terminal or the command line application of your choice, navigate to the root directory of the Employee Management System folder.

### Installing Node packages

Install all required packages by running the following code:

`npm install`

### Creating your .env file

In Terminal, remain in the root directory of the application folder and run the following command: 

`touch .env`

This will create a .env file for you to fill in.

After, open the folder in Visual Studio Code or your choice of source code editor. Copy the contents of the `.env.EXAMPLE` file into your newly created `.env` file.

Fill out the blank user and password fields and save.

```
DB_NAME=employee_tracker_db
DB_USER=root
DB_PASSWORD=Put_Your_MySQL_Password_Here
```

### Sourcing Schema and Seeding

The database for this application will first need to be created locally. Sample data can be added in afterwards

In Terminal, if you are not already in the root directory of Employee Management System then first navigate there. Then, navigate to the database folder of the application by running the following command:

`cd db`

Enter the MySQL shell using the command:

`mysql -u root -p`

Enter your MySQL password.

Run the following commands, one after the other, in order to create the database the application will use, and then seed the database with data.

```
source schema.sql;
source seeds.sql;
```

Finally, exit the MySQL Shell by running the command:

`exit`

And navigate back to the root directory of the application.

`cd ..`

You are ready to start using the Employee Management System!

## Usage

In order to use the Employee Management System application, using the Terminal or the Integrated Terminal available on Visual Studio Code, navigate to the root directory of the application folder.

Start the application by running the following command:

`npm start` OR `npm run start`

You will be greeted with a selection of things to do, such as view all departments, roles, and employees in the database, add departments, update roles, view by managers or by departments.

## Demo

**[Walkthrough video showing Employee Management System in action](https://drive.google.com/file/d/1egiNfGD1Iil0b7RahMRk0XhDkkdAtwhC/view)**

---

[Video link on sourcing schema and seeds](https://drive.google.com/file/d/1A4ZOr1P3LrrsSgZpKgMYWb7ZwmBmpdpw/view)

Below: Gif of video showing sourching schema and seeds

![Demo of Employee Management System: Sourcing schema and seeds](assets/images/demo-sourcing-schema-seeds.gif?raw=true "Employee Management System demo sourcing schema and seeds")

[Video link showing 'View All' selections](https://drive.google.com/file/d/1ODkSsalCyHez5a8xbSAN-CVJDRbefIO8/view)

Below: Gif of video showing 'View All' selections

![Demo of Employee Management System: View All](assets/images/demo-view-all-sections.gif?raw=true "Employee Management System demo view all")

[Video link showing 'View By' selections](https://drive.google.com/file/d/1VRUpZCi4gRKmrUXi2_NA-SYn74EBcnhI/view)

Below: Gif of video showing 'View By' selections

![Demo of Employee Management System: View By](assets/images/demo-view-by-sections.gif?raw=true "Employee Management System demo view by")

[Video link showing 'Add Department/Add Role' selections](https://drive.google.com/file/d/1aNOx4lL9yl0nL5wIg4DaJOmtWNygCPJy/view)

Below: Gif of video showing 'Add Department/Add Role' selections

![Demo of Employee Management System: Add Department and Add Role](assets/images/demo-add-depts-add-roles.gif?raw=true "Employee Management System demo add department and add role")

[Video Link showing 'Add/Update Employee' selections](https://drive.google.com/file/d/1JmswdJjtDgdN72G-ecTVzfRT3__6cBTt/view)

Below: Gif of video showing 'Add/Update Employee' selections

![Demo of Employee Management System: Add/Update Employee](assets/images/demo-add-update-employee.gif?raw=true "Employee Management System demo add and update employee")

## Screenshots

Sourcing schema and seeds:

![Screenshot of Employee Management System: Sourcing schema and seeds](assets/images/screenshot-sourcing-schema-seeds.jpg?raw=true "Employee Management System screenshot sourcing schema and seeds")

---

'View All' selections

![Screenshot of Employee Management System: View All](assets/images/screenshot-view-all-sections.jpg?raw=true "Employee Management System screenshot view all")

---

'View By' selections

![Screenshot of Employee Management System: View By](assets/images/screenshot-view-by-sections.jpg?raw=true "Employee Management System screenshot view by")

---

'Add Department/Add Role' selections

![Screenshot of Employee Management System: Add Department and Add Role](assets/images/screenshot-add-depts-add-roles.jpg?raw=true "Employee Management System screenshot add department and add role")

---

'Add/Update Employee' selections

![Screenshot of Employee Management System: Add/Update Employee](assets/images/screenshot-add-update-employee.jpg?raw=true "Employee Management System screenshot add and update employee")

## License

?? 2022 Sushan Yue

This project is licensed under the [MIT License](./LICENSE.txt).

## Resources

* [Node.js](https://nodejs.org/en/)

* [dotenv](https://www.npmjs.com/package/dotenv)

* [Node MySQL 2](https://www.npmjs.com/package/mysql2)

* [console.table](https://www.npmjs.com/package/console.table)

* [Inquirer](https://www.npmjs.com/package/inquirer)

* [Pencil Programmer - Self-referencing Foreign Key in MySQL](https://pencilprogrammer.com/self-referencing-foreign-key-in-mysql/)

* [Tech on the Net - Foreign Keys](https://www.techonthenet.com/sql_server/foreign_keys/foreign_delete_null.php)

* [Learn SQL - What is Self Join in SQL?](https://learnsql.com/blog/what-is-self-join-sql/)

* [Learn SQL - How to Learn SQL Joins](https://learnsql.com/blog/learn-and-practice-sql-joins/)

* [MySQL Tutorial - MySQL Self Join](https://www.mysqltutorial.org/mysql-self-join/)

* [MySQL Tutorial - Foreign Key](https://www.mysqltutorial.org/mysql-foreign-key/)

* [W3 Schools - SQL/Join](https://www.w3schools.com/sql/sql_join_left.asp)

* [Stack Overflow - Joining three tables](https://stackoverflow.com/questions/3709560/joining-three-tables-using-mysql/3709583#3709583)

* [W3 Schools - Promises](https://www.w3schools.com/js/js_promise.asp)

* [MDN Web Docs - Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)

* [JavaScript.info - Promise Chaining](https://javascript.info/promise-chaining)


## Contact
[Sushan Yue @ GitHub](https://github.com/AtlantaBlack)


