const { readData, createUpdateDelete, readDataWithCondition } = require('../../helpers/Promise/PromiseModule');

const authQueries = {
  createUserQuery,
  getUserById,
  updateUserPassword
};

async function createUserQuery(inputArray) {
  const sqlQuery = 'INSERT INTO user(id, userName, normalizedUserName, email, normalizedEmail, passwordHash, isActive) VALUES(?)';
  return createUpdateDelete(sqlQuery, inputArray);
}
async function getUserById(inputArray) {
  const sqlQuery = `SELECT * FROM audit_log WHERE id ='${inputArray[0]}'`;
  return readDataWithCondition(sqlQuery, inputArray);
}
async function updateUserPassword(inputArray) {
  const sqlQuery = `UPDATE audit_log SET password='${inputArray[0]}' WHERE id='${inputArray[0]}'`;
  return createUpdateDelete(sqlQuery, inputArray);
}

module.exports = authQueries;
