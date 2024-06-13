const express = require('express');
const { validateRequest } = require('../middlewares/validationRequest');
const { CreateRoleValidationSchema } = require('../modules/roles/roles.validation');
const { body } = require('../../helpers/InputProperty/inputProperty');
const { createRoles, getAllRoles } = require('../modules/roles/roles.controller');
const { authenticateUser, isSuperAdmin } = require('../middlewares/authentication');
const routes = express.Router();

routes.post(
    '/create-role',
    authenticateUser,
    isSuperAdmin,
    validateRequest(CreateRoleValidationSchema, body),
    createRoles
);

routes.get(
    '/',
    getAllRoles
);

module.exports = routes;