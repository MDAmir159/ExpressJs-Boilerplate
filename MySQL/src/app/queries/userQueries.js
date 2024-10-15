const {
  readData,
  createUpdateDelete
} = require('../../helpers/Promise/PromiseModule');

const userQueries = {
  createUserQuery,
  getUserByEmailQuery,
  getUserRoleNameByUserIdQuery,
  updateUserInfoQuery,
  deleteUserQuery,
  updatePasswordQuery
};

async function createUserQuery(inputArray) {
  const sqlQuery = `INSERT
                    INTO user 
                        (id, userName, normalizedUserName, email, normalizedEmail, passwordHash, isActive, creationTime) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP())`;
  return createUpdateDelete(sqlQuery, inputArray);
}

async function getUserByEmailQuery(email) {
  const sqlQuery = `SELECT * 
                    FROM user 
                    WHERE normalizedEmail="${email}" AND isDeleted=0`;
  return readData(sqlQuery);
}

async function getUserRoleNameByUserIdQuery(inputObj) {
  const { userId } = inputObj;
  const sqlQuery = `SELECT r.name as roleName 
                    FROM userroles AS actual 
                    LEFT JOIN user AS u ON u.id = actual.userId 
                    LEFT JOIN roles as r ON r.id = actual.roleId 
                    WHERE u.id='${userId}';`
  return readData(sqlQuery);
}

async function updateUserInfoQuery(inputObj) {
  const { userId, normalizedEmail, phoneNumber, userName, name } = inputObj;
  const sqlQuery = `UPDATE user 
                    SET normalizedEmail = "${normalizedEmail}", 
                    phoneNumber = "${phoneNumber}",
                    userName = "${userName}",
                    name = "${name}"
                    WHERE id="${userId}"`;
  return readData(sqlQuery);
}

async function deleteUserQuery(inputObj) {
  const { userId } = inputObj;
  const sqlQuery = `UPDATE user 
                    SET isDeleted = 1
                    WHERE id="${userId}"`;
  return readData(sqlQuery);
}

async function updatePasswordQuery(inputObj) {
  const { userId, newPasswordHash } = inputObj;
  const sqlQuery = `UPDATE user 
                    SET passwordHash = "${newPasswordHash}"
                    WHERE id="${userId}"`;
  return readData(sqlQuery);
}

module.exports = userQueries;
