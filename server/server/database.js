const mysql = require("mysql2/promise");
const config = require("./db_config.json");


exports.pool = mysql.createPool(config);


