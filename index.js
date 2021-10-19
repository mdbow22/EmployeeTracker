const inquirer = require('inquirer');
const {viewTable, insertDepartment, insertRole} = require('./queries');

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
                        .then((results) => logResults(results[0]));
                    break;
                case 'View all roles':
                    viewTable('roles')
                        .then((results) => logResults(results[0]));
                    break;
                case 'View all departments':
                    viewTable('departments')
                        .then((results) => logResults(results[0]));
                    break;
                case 'Add a department':
                    addDepartment();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Add an employee':
                    //addToDB('employee');
                    break;
                case 'Update an employee\'s role':
                    //updateEmployee
                    break;
            }
        })
        .catch((err) => console.error(err));
}

function logResults(results) {
    console.table(results);
    selectTask();
}

function addDepartment() {
    let deptName = [{
        type: 'input',
        name: 'deptName',
        message: 'What is the name of the new department?'
    }];

    inquirer.prompt(deptName)
        .then((answers) => {insertDepartment(answers.deptName)
            .then((data) => {
                console.log(`${deptName} has been added`);
                selectTask();
            })
        })
        .catch((err) => console.error(err));
}

function addRole() {

    //Find all departments to use in prompts
    viewTable('departments')
        .then((results) => {

            //convert departments into an array
            resultsArray = results[0];
            let allDepts = resultsArray.map(e => e.name);

            //save id of departments to match up later
            let deptIds = resultsArray.map(e => e.id);

            //prompts for adding a role
            let roleQs = [
                {
                    type: 'input',
                    name: 'roleName',
                    message: 'What is the title of the new role?'
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'What is the salary for the role (numerals only)?'
                },
                {
                    type: 'list',
                    name: 'department',
                    message: 'What department does the role belong to?',
                    choices: allDepts
                }
            ]

            inquirer.prompt(roleQs)
                .then((answers) => {
                    insertRole(answers.roleName, answers.salary, deptIds[allDepts.indexOf(answers.department)])
                        .then((results) => {
                            console.log(`${answers.roleName} has been added`);
                        })
                })
        });
}

    

selectTask();