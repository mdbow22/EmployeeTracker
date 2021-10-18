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

  async function viewTable(table) {
    console.log('it worked!');
      const data = await db.promise().query(`SELECT * FROM ${table}`);
      
      return data;
  }

  module.exports = {viewTable};