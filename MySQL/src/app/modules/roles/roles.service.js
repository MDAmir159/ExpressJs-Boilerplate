const { v4: uuid } = require('uuid');
const {
    normalizeRoleName
} = require('../../middlewares/normalize');
const {
    createRoleQuery,
    getRoleByRoleNameQuery,
    getAllRolesQuery
} = require('../../queries/roleQueries');
const {
    CONFLICT,
    CREATED,
    OK,
    INTERNAL_SERVER_ERROR
} = require('../../HTTPStatus');

async function createRolesService(payload) {
    const { roleName } = payload;
    const id = uuid();

    const normalizedRoleName = normalizeRoleName(roleName);
    try {
        const roleNameSearchResponse = await getRoleByRoleNameQuery(normalizedRoleName);
        if (roleNameSearchResponse && roleNameSearchResponse.length !== 0) {
            return { statusCode: CONFLICT }
        }
        const inputArray = [id, roleName, normalizedRoleName];
        const response = await createRoleQuery(inputArray);
        if (response.affectedRows !== 0 || response.changedRows !== 0) {
            return {
                statusCode: CREATED,
                payload: {
                    roleId: id,
                    roleName: normalizedRoleName,
                }
            }
        } else {
            return {
                statusCode: INTERNAL_SERVER_ERROR
            }
        }
    } catch (error) {
        return { error: error }
    }
}

async function getAllRolesService() {
    try {
        const response = await getAllRolesQuery();
        return response
    } catch (error) {
        return { error: error }
    }
}

module.exports = {
    createRolesService,
    getAllRolesService
}