const { 
    createUpdateDelete, 
    readData 
} = require("../../helpers/Promise/PromiseModule");

async function createUserRoleQuery(inputArray) {
    const sqlQuery = `INSERT INTO userroles (userid, roleid) VALUES (?, ?)`;
    return createUpdateDelete(sqlQuery, inputArray)
}

async function getUserRoleByUserIdQuery(inputObj) {
    const { userId } = inputObj;
    const sqlQuery = `SELECT * from userroles WHERE userroles.userId='${userId}'`;
    return readData(sqlQuery);
}

module.exports = {
    createUserRoleQuery,
    getUserRoleByUserIdQuery
}