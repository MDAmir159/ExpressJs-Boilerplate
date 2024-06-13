const { CONFLICT, CREATED } = require("../../HTTPStatus");
const { getUserRoleNameByUserIdQuery } = require("../../queries/userQueries");
const {
    createUserRoleQuery,
    getUserRoleByUserIdQuery
} = require("../../queries/userRolesQueries");

async function createUserRolesService(payload) {
    const { userId, roleId } = payload;
    try {
        const searchForUserResponse = await getUserRoleByUserIdQuery({ userId: userId });
        
        if (searchForUserResponse && searchForUserResponse.length == 1) {
            return { statusCode: CONFLICT }
        }
        const inputArray = [userId, roleId];
        const response = await createUserRoleQuery(inputArray);
        return { statusCode: CREATED }
    } catch (error) {
        return { error: error }
    }
}

const getUserRoleNameByUserIdService = async (payload) => {
    const { id } = payload;
    try {
        const response = await getUserRoleNameByUserIdQuery({ userId: id });
        return response
    } catch (error) {
        return { error: error }
    }
}

module.exports = {
    createUserRolesService,
    getUserRoleNameByUserIdService
}