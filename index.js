const inquirer = require('inquirer');
const {viewTable, insertDepartment, insertRole, insertEmployee} = require('./queries');

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
                            selectTask();
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
        //Add a none option at the end
        allEmployees.push('None');

        const employeeIds = employees.map(e => e.id);

        const employeesArray = [allEmployees, employeeIds]; 

        //Generate prompts for adding a new employee
        const employeeQs = [
            {
                type: 'input',
                name: 'firstName',
                message: 'What is the employee\'s first name?'
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'What is the employee\'s last name?'
            },
            {
                type: 'list',
                name: 'role',
                message: 'What is the employee\'s role?',
                choices: rolesArray[0]
            },
            {
                type: 'list',
                name: 'manager',
                message: 'Who is the employee\'s manager?',
                choices: employeesArray[0]
            }
        ];

        const answers = await inquirer.prompt(employeeQs);

        let newRole;

        //insert employee into db, but only pass manager ID if user picked option other than 'None'
        if (answers.manager === 'None') {
            newRole = await insertEmployee(answers.firstName, answers.lastName, roleIds[allRoles.indexOf(answers.role)]);
        } else {
            newRole = await insertEmployee(answers.firstName, answers.lastName, roleIds[allRoles.indexOf(answers.role)], employeeIds[allEmployees.indexOf(answers.manager)]);
        }
        
        console.log(`${answers.firstName} ${answers.lastName} has been added to the database`);
        selectTask();
        
    } catch (err) {
        console.error(err);
    }

}

function updateEmployee() {

}

selectTask();