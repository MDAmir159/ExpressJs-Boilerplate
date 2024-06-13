const { INTERNAL_SERVER_ERROR, CREATED, CONFLICT, OK } = require("../../HTTPStatus")
const { createRolesService, getAllRolesService } = require("./roles.service")

const createRoles = async (req, res, next) => {
    try {
        const response = await createRolesService(req.body);
        if (response?.error) {
            throw response?.error
        }
        switch (response?.statusCode) {
            case CONFLICT:
                return res.status(CONFLICT).json({
                    message: "Role Already exists"
                })
            case CREATED:
                return res.status(CREATED).json({
                    message: "Added role successfully"
                })
            default:
                break;
        }
    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).json(error);
    }
}

const getAllRoles = async (req, res, next) => {
    try {
        const response = await getAllRolesService();
        return res.status(OK).json(response);
    } catch (error) {
        return { error: error }
    }
}

module.exports = {
    createRoles,
    getAllRoles
}