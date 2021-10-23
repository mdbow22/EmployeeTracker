# EmployeeTracker
Command Line App to keep track of employees

## Description

This command line app allows a user to add employees, departments, and roles to a MySQL database and also update any employee's role. This is done through the Inquirer and MySQL2 NPM packages.

## Installation

After forking the repo, run the following command to install all dependencies:

    npm install

The code in this app relies on a particular database schema in MySQL. To set-up the database, log into MySQL and then run the following command:

    source db/schema.sql

This will install the database schema and files. If you need example data to use the database, you can run the seed file as well:

    source db/seed.sql

Finally, make sure you update the queries.js file with your MySQL credentials (host, username, and password).

## Usage

This app is used entirely within the command line/terminal. To initiate the app, run:

    node index

You will then be given a prompt to select an option:

[insert screenshot]

Clicking any of the view options will return the entire table (employees, roles, or departments):

[insert screenshot]

Clicking any of the adds will walk you through adding. The screenshots below are for adding a role:

[insert screenshots]

At the end of any selection, you will then be prompted for the next action you want to perform. Simply end Node to exit the app.

## Questions

Please send any questions to me through github: https://github.com/mdbow22. Issues can be posted in the repo's issues area.

## Demo

Here is a linke to a video walkthrough of the app in action: https://drive.google.com/file/d/1qhQIz43XKFmiIZyP-r1jEzfXGCL8dMiP/view