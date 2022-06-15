const mysql = require('mysql2/promise');

exports.pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '111111',
  database: 'test',
  connectionLimit: 30,
  // multipleStatements: true,
});
