# Employee Tracker
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

The Employee Tracker application is a content management system. Users are able to view the departments, roles, and employees within an organisation, as well as add and update sections.

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
* MySQL2
* console.table

## Installation

This application uses Node.js, Inquirer, MySQL2, and dotenv, and will require installation of these packages to run. Users will also be required to create their own .env file to enable them to connect to the database using their local machine.

First, clone the [Employee Tracker repository](https://github.com/AtlantaBlack/Employee_Tracker) or download the repository to your machine. Then, using Terminal or the command line application of your choice, navigate to the root directory of the Employee Tracker folder.

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

In Terminal, if you are not already in the root directory of Employee Tracker then first navigate there. Then, navigate to the database folder of the application by running the following command:

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

You are ready to start using the Employee Tracker!

## Usage

In order to use the Employee Tracker application, using the Terminal or the Integrated Terminal available on Visual Studio Code, navigate to the root directory of the application folder.

Start the application by running the following command:

`npm start` OR `npm run start`

You will be greeted with a selection of things to do, such as view all departments, roles, and employees in the database, add departments, update roles, view by managers or by departments.

## Demo

**[Walkthrough video showing Employee Tracker in action](https://drive.google.com/file/d/1egiNfGD1Iil0b7RahMRk0XhDkkdAtwhC/view)**

---

[Video link on sourcing schema and seeds](https://drive.google.com/file/d/1A4ZOr1P3LrrsSgZpKgMYWb7ZwmBmpdpw/view)

Below: Gif of video showing sourching schema and seeds

![Demo of Employee Tracker: Sourcing schema and seeds](assets/images/demo-sourcing-schema-seeds.gif?raw=true "Employee Tracker demo sourcing schema and seeds")

[Video link showing 'View All' selections](https://drive.google.com/file/d/1ODkSsalCyHez5a8xbSAN-CVJDRbefIO8/view)

Below: Gif of video showing 'View All' selections

![Demo of Employee Tracker: View All](assets/images/demo-view-all-sections.gif?raw=true "Employee Tracker demo view all")

[Video link showing 'View By' selections](https://drive.google.com/file/d/1VRUpZCi4gRKmrUXi2_NA-SYn74EBcnhI/view)

Below: Gif of video showing 'View By' selections

![Demo of Employee Tracker: View By](assets/images/demo-view-by-sections.gif?raw=true "Employee Tracker demo view by")

[Video link showing 'Add Department/Add Role' selections](https://drive.google.com/file/d/1aNOx4lL9yl0nL5wIg4DaJOmtWNygCPJy/view)

Below: Gif of video showing 'Add Department/Add Role' selections

![Demo of Employee Tracker: Add Department and Add Role](assets/images/demo-add-depts-add-roles.gif?raw=true "Employee Tracker demo add department and add role")

[Video Link showing 'Add/Update Employee' selections](https://drive.google.com/file/d/1JmswdJjtDgdN72G-ecTVzfRT3__6cBTt/view)

Below: Gif of video showing 'Add/Update Employee' selections

![Demo of Employee Tracker: Add/Update Employee](assets/images/demo-add-update-employee.gif?raw=true "Employee Tracker demo add and update employee")

## Screenshots

Sourcing schema and seeds:

![Screenshot of Employee Tracker: Sourcing schema and seeds](assets/images/screenshot-sourcing-schema-seeds.jpg?raw=true "Employee Tracker screenshot sourcing schema and seeds")

---

'View All' selections

![Screenshot of Employee Tracker: View All](assets/images/screenshot-view-all-sections.jpg?raw=true "Employee Tracker screenshot view all")

---

'View By' selections

![Screenshot of Employee Tracker: View By](assets/images/screenshot-view-by-sections.jpg?raw=true "Employee Tracker screenshot view by")

---

'Add Department/Add Role' selections

![Screenshot of Employee Tracker: Add Department and Add Role](assets/images/screenshot-add-depts-add-roles.jpg?raw=true "Employee Tracker screenshot add department and add role")

---

'Add/Update Employee' selections

![Screenshot of Employee Tracker: Add/Update Employee](assets/images/screenshot-add-update-employee.jpg?raw=true "Employee Tracker screenshot add and update employee")

## License

© 2022 Sushan Yue

This project is licensed under the [MIT License](./LICENSE.txt).

## Resources

* [resource]()


## Contact
[Sushan Yue @ GitHub](https://github.com/AtlantaBlack)


