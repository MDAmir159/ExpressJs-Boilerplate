const { INTERNAL_SERVER_ERROR, CREATED, CONFLICT, OK } = require("../../HTTPStatus");
const { createUserRolesService } = require("./userroles.service");

const createUserRoles = async (req, res, next) => {
    try {
        const response = await createUserRolesService(req.body);
        if (response?.error) {
            throw response?.error
        }
        switch (response?.statusCode) {
            case CONFLICT:
                return res.status(CONFLICT).json({
                    message: "User already has an assigned role"
                });
                break;
            case CREATED:
                return res.status(CREATED).json({
                    message: "Roles successfully added to User"
                });
                break;
            default:
                break;
        }

    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).json(error)
    }
}

module.exports = {
    createUserRoles
}