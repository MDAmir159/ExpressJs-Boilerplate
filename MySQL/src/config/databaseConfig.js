const mysql = require('mysql2/promise');
const { USER, HOST, CONNECTION_LIMIT, PASSWORD, DATABASE, DB_PORT } = require('.');
// Create a function to establish a connection pool
const pool = async () => {
    try {
        return mysql.createPool({
            host: HOST,
            user: USER,
            password: PASSWORD,
            database: DATABASE,
            port: DB_PORT,
            waitForConnections: true,
            connectionLimit: CONNECTION_LIMIT
        });
    } catch (error) {
        console.log(error);
    }
}
// Export the createPool function
module.exports = pool;
