const express = require('express');
const { validateRequest } = require('../middlewares/validationRequest');
const { CreateUserRoleValidationSchema } = require('../modules/userroles/userroles.validation');
const { body } = require('../../helpers/InputProperty/inputProperty');
const { createUserRoles } = require('../modules/userroles/userroles.controller');
const { authenticateUser } = require('../middlewares/authentication');
const routes = express.Router();

routes.post(
    '/add-role',
    authenticateUser,
    validateRequest(CreateUserRoleValidationSchema, body),
    createUserRoles
);

routes.get(
    '/'
);

module.exports = routes;