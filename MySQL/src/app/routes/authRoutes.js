// const express = require('express');
// const routes = express.Router();
// const { validateRequest } = require('../middlewares/validationRequest');
// const isAuthenticated = require('../middlewares/authorization');
// const { body } = require('../../helpers/InputProperty/inputProperty');
// const { 
//     changePassword, 
//     createUser, 
//     loginUser
// } = require('../modules/auth/auth.controller');
// const { 
//     registerValidationsSchema, 
//     changePasswordSchema, 
//     loginValidationsSchema 
// } = require('../modules/auth/auth.validation');

// //login
// routes.post('/login', validateRequest(loginValidationsSchema, body), loginUser);

// // create new user
// routes.post('/signup', validateRequest(registerValidationsSchema, body), createUser);

// // create first super admin
// routes.post('/add-seed')

// // change password
// // routes.post('/change-password', isAuthenticated(), validateRequest(changePasswordSchema), changePassword);

// module.exports = routes;
