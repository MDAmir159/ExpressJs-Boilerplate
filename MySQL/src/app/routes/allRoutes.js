const express = require('express');
const routes = express.Router();

const userRoutes = require('./userRoutes');
const rolesRoutes = require('./rolesRoutes');
const userRolesRoutes = require('./userRolesRoutes');
const startUpRoutes = require('./startUpRoutes');

routes.use('/user', userRoutes);
routes.use('/roles', rolesRoutes);
routes.use('/userroles', userRolesRoutes);
routes.use('/startup', startUpRoutes);

module.exports = routes;
