const config = require("../../config");
const pool = require("../../config/databaseConfig");

const queryDatabase = async (sqlQuery, sqlValue) => {
  try {
    const connectionPool = await pool();
    const db = await connectionPool.getConnection();
    const [rows, fields] = await db.query(sqlQuery, sqlValue);

    await killOtherProcesses(db);
    return rows;
  } catch (error) {
    return { error: error };
  }
};

const killOtherProcesses = async (db) => {
  try {
    const [processListRows] = await db.query('SHOW PROCESSLIST');

    // Loop through the results and kill processes (excluding the current connection)
    for (const process of processListRows) {
      if (process.Command === 'Sleep' && process.Time > 5 && process.db === config.DATABASE) {
        await db.query(`KILL ${process.Id}`);
        console.log(`Killed process ${process.Id}`);
      }
    }
    db.release();
  } catch (error) {
    return { error };
  }
};

const executeWithTransaction = async (callback) => {
  const connectionPool = await pool();
  const db = await connectionPool.getConnection();

  try {
    await db.beginTransaction();
    const result = await callback(db);
    await db.commit();
    return result;
  } catch (error) {
    await db.rollback();
    return { error };
  } finally {
    db.release();
  }
};

module.exports = {
  createUpdateDelete: (sqlQuery, sqlValue) => queryDatabase(sqlQuery, sqlValue),
  readData: (sqlQuery) => queryDatabase(sqlQuery),
  readDataWithCondition: (sqlQuery, sqlValue) => queryDatabase(sqlQuery, sqlValue),
  executeWithTransaction,
  killOtherProcesses
};
