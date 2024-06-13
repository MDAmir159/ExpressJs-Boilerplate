const {
    OK, CONFLICT, CREATED
} = require("../../HTTPStatus");
const {
    createSuperAdminSeedUserService, cleanDatabaseStartUpService
} = require("./startup.service");

const createSuperAdminSeedUser = async (req, res, next) => {
    // here manually we are adding the super admin as the first seed user of 
    // the system
    req.body.roleName = "superadmin"
    try {
        const response = await createSuperAdminSeedUserService(req.body);
        if (response?.error) {
            throw response?.error
        }
        switch (response?.statusCode) {
            case CONFLICT:
                return res.status(CONFLICT).json({
                    message: "THIS SEED ALREADY EXISTS"
                })
            case CREATED:
                return res.status(CREATED).send({ message: "SEED USER HAS BEEN ADDED SUCCESSFULLY. You are ALL SET!!" });
            default:
                break;
        }
    } catch (error) {
        next(error);
    }
}

const cleanDatabaseStartUp = async (req, res, next) => {
    try {
        const response = await cleanDatabaseStartUpService(req.body);
        if (response?.error) {
            throw response?.error
        }
        switch (response?.statusCode) {
            case OK:
                req.DBCleanMessage = "DB Is cleaned Up"
        }
        // starting data seeding process
        req.body.roleName = "superadmin"
        const createSuperAdminSeedUserResponse = await createSuperAdminSeedUserService(req.body);
        if (createSuperAdminSeedUserResponse?.error) {
            throw createSuperAdminSeedUserResponse?.error
        }
        switch (createSuperAdminSeedUserResponse?.statusCode) {
            case CONFLICT:
                return res.status(CONFLICT).json({
                    message: "THIS SEED ALREADY EXISTS"
                })
            case CREATED:
                return res.status(CREATED).send({ message: "SEED USER HAS BEEN ADDED SUCCESSFULLY. You are ALL SET!!" });
            default:
                break;
        }
    } catch (error) {
        next(error);
    }
}
module.exports = {
    createSuperAdminSeedUser,
    cleanDatabaseStartUp
}