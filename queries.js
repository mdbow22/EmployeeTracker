const mysql = require('mysql2');

//set up database connection
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'hereliesBashokingofthedud3s',
      database: 'company_db'
    },
    console.log(`Connected to company_db database.`)
  );

  //Select all data from a given table
  async function viewTable(table) {
      const data = await db.promise().query(`SELECT * FROM ${table}`);
      
      return data;
  }

  async function insertDepartment(department) {
    const data = await db.promise().query(`INSERT INTO departments (name) VALUES (?)`, department);

    return data;
  }

  async function insertRole(title, salary, department) {
    const data = await db.promise().query(`INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`, [title, salary, department]);
    
    return data;
  }

  async function insertEmployee(firstName, lastName, roleId, managerId) {
    
    let data;

    //only insert a value for manager column if one was passed into the function
    if(managerId) {
      data = await db.promise().query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES(?,?,?,?)`, [firstName, lastName, roleId, managerId]);
    } else {
      data = await db.promise().query(`INSERT INTO employees (first_name, last_name, role_id) VALUES(?,?,?)`, [firstName, lastName, roleId]);
    }
    
    return data;
  }

  module.exports = {viewTable, insertDepartment, insertRole, insertEmployee};