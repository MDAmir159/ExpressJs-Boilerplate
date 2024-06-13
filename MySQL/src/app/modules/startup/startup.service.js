const {
    OK, CREATED,
    CONFLICT,
    INTERNAL_SERVER_ERROR
} = require("../../HTTPStatus");
const {
    cleanDatabaseStartUpQuery
} = require("../../queries/startupQueries");
const {
    createRolesService
} = require("../roles/roles.service");
const {
    createUserService
} = require("../user/user.service");
const {
    createUserRolesService
} = require("../userroles/userroles.service");

const createSuperAdminSeedUserService = async (payload) => {
    try {
        // save the super admin 
        const createAdminUserResponse = await createUserService(payload);

        if (createAdminUserResponse?.error) {
            throw createAdminUserResponse?.error
        }
        if (createAdminUserResponse?.statusCode === CONFLICT) {
            return { statusCode: CONFLICT }
        }
        const { userDetails } = createAdminUserResponse;
        const { userId, userName, email } = userDetails;

        // create the role of super admin
        const createSuperAdminRoleResponse = await createRolesService(payload);

        if (createSuperAdminRoleResponse?.error) {
            throw createSuperAdminRoleResponse?.error
        }

        switch (createSuperAdminRoleResponse?.statusCode) {
            case CONFLICT:
                return { statusCode: CONFLICT }
            case INTERNAL_SERVER_ERROR:
                return { statusCode: INTERNAL_SERVER_ERROR }
        }

        const { roleId, roleName } = createSuperAdminRoleResponse?.payload

        const setUserRolePayload = {
            userId: userId,
            roleId: roleId
        }

        // assign the role to the super admin user
        const setSeedUserAsSuperAdminResponse = await createUserRolesService(setUserRolePayload);

        return {
            statusCode: CREATED,
            response: {
                superAdminUserName: userName,
                superAdminEmail: email,
                assignedRole: roleName
            }
        }
    } catch (error) {
        return { error: error }
    }
}

const cleanDatabaseStartUpService = async (payload) => {
    try {
        const databaseResponse = await cleanDatabaseStartUpQuery();
        if (databaseResponse?.error) {
            throw databaseResponse?.error
        }
        return { statusCode: OK }
    } catch (error) {
        return { error: error }
    }
}

module.exports = {
    createSuperAdminSeedUserService,
    cleanDatabaseStartUpService
}