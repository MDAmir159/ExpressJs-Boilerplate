const express = require('express');
const {
    cleanDatabaseStartUp,
    createSuperAdminSeedUser
} = require("../modules/startup/startup.controller");
const { validateRequest } = require('../middlewares/validationRequest');
const { CreateSuperAdminSeedUserValidationSchema } = require('../modules/startup/startup.validation');
const { body } = require('../../helpers/InputProperty/inputProperty');

const routes = express.Router();

routes.post(
    '/seed-data',
    validateRequest(
        CreateSuperAdminSeedUserValidationSchema,
        body
    ),
    createSuperAdminSeedUser
);

module.exports = routes;