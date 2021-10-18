const inquirer = require('inquirer');
const {viewTable} = require('./queries');

function selectTask() {
    const question = [
        {
            type: 'list',
            name: 'whatToDo',
            message: 'What would you like to do first?',
            choices: ['View all employees',
                      'View all roles',
                      'View all departments',
                      'Add an employee',
                      'Add a role',
                      'Add a department',
                      'Update an Employee\'s role']
        }
    ]
    inquirer.prompt(question)
        .then((answers) => {
            switch (answers.whatToDo) {
                case 'View all employees':
                    viewTable('employees')
                        .then((results) => {
                            console.table(results[0]);
                            selectTask();
                        });
                    break;
                case 'View all roles':
                    viewTable('roles')
                        .then((results) => {
                        console.table(results[0]);
                        selectTask();
                    });
                    break;
                case 'View all departments':
                    viewTable('departments')
                        .then((results) => {
                        console.table(results[0]);
                        selectTask();
                    });
                    break;
                case 'Add a department':
                    //addDepartment()
                    break;
                case 'Add a role':
                    //addRole()
                    break;
                case 'Add an employee':
                    //addEmployee
                    break;
                case 'Update an employee\'s role':
                    //updateEmployee
                    break;
            }
        })
        .catch((err) => console.error(err));
}

selectTask();