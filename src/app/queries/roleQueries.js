const { createUpdateDelete, readData } = require("../../helpers/Promise/PromiseModule");

async function createRoleQuery(inputArray) {
    const sqlQuery = `INSERT INTO roles (id, name, normalizedName) VALUES (?, ?, ?)`;
    return createUpdateDelete(sqlQuery, inputArray)
}

async function getAllRolesQuery() {
    const sqlQuery = `SELECT * FROM roles`;
    return readData(sqlQuery);
}

async function getRoleByIdQuery(roleId) {
    const sqlQuery = `SELECT * FROM roles WHERE id="${roleId}"`;
    return readData(sqlQuery);
}

async function getRoleByRoleNameQuery(roleName) {
    const sqlQuery = `SELECT * FROM roles WHERE name='${roleName}'`;
    return readData(sqlQuery);
}

module.exports = {
    createRoleQuery,
    getRoleByIdQuery,
    getRoleByRoleNameQuery,
    getAllRolesQuery
}