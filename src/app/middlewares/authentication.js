const config = require("../../config");
const {
    UNAUTHORIZED,
    FORBIDDEN,
    NOT_FOUND
} = require("../HTTPStatus");
const jwt = require('jsonwebtoken');
const {
    getUserByEmailService
} = require("../modules/user/user.service");
const {
    normalizeEmail
} = require("./normalize");
const { getUserRoleNameByUserIdService } = require("../modules/userroles/userroles.service");

function authenticateUser(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(UNAUTHORIZED);

    jwt.verify(token, config.JWT_SECRET_KEY, async (err, user) => {
        if (err) return res.sendStatus(FORBIDDEN);
        const userDetails = await getUserByEmailService(normalizeEmail(user?.email));
        if (userDetails && userDetails?.length === 0) {
            return res.status(NOT_FOUND).json({
                message: "User Not Found"
            })
        }
        const userRole = await getUserRoleNameByUserIdService({ id: userDetails[0].id });
        req.user = userDetails;
        req.userRole = userRole[0].roleName | "";
        next();
    });
}

function isSuperAdmin(req, res, next) {
    const { userRole } = req.userRole;
    if (userRole === 'superadmin') {
        next()
    } else {
        return res.status(FORBIDDEN).json({
            message: "Access Denied"
        })
    }
}

function isAdmin(req, res, next) {
    const { userRole } = req.userRole;
    if (userRole === 'admin') {
        next()
    } else {
        return res.status(FORBIDDEN).json({
            message: "Access Denied"
        })
    }
}
module.exports = {
    authenticateUser,
    isSuperAdmin,
    isAdmin
}