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
                    addEmployee();
                    break;
                case 'Update an employee\'s role':
                    updateEmployee();
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

async function addEmployee() {
    try {
        //Pull back all employees and roles to be able to use ids in SQL query
        const roleData = await viewTable('roles');
        const employeeData = await viewTable('employees');

        const roles = roleData[0];
        const employees = employeeData[0];

        //Create an array of roles and their ids to link them together
        const allRoles = roles.map(e => e.title);
        const roleIds = roles.map(e => e.id);
        const rolesArray = [allRoles, roleIds];

        //Create an array of employees and ids to link them together
        const allEmployees = employees.map((e) => {
            return `${e.first_name} ${e.last_name}`;
        });
        const employeeIds = employees.map(e => e.id);
        const employeesArray = [allEmployees, employeeIds];

        console.log(rolesArray);
        console.log(employeesArray);
        
    } catch (err) {
        console.error(err);
    }

}

function updateEmployee() {

}

function getIds(table) {
    viewTable(table)
        .then((results) => {

            let resultsArray = [];
            let returnArray = [];
            //convert items into an array
            resultsArray = results[0];
            allItems = resultsArray.map(e => e.name);

            //save id of each item into another array
            itemIds = resultsArray.map(e => e.id);

            //create an array of arrays so items and their ids are linked by indices
            returnArray.push(allItems);
            returnArray.push(itemIds);

            return returnArray;
        });
}

selectTask();