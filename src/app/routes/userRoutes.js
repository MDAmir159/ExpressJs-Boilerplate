const express = require('express');
const { validateRequest } = require('../middlewares/validationRequest');
const {
    createUser,
    loginUser,
    updateUserInfo,
    forgotPasswordEmail,
    deleteUser,
    updatePassword
} = require('../modules/user/user.controller');
const {
    CreateUserValidationSchema,
    LoginValidationSchema,
    UpdateProfileValidationSchema,
    ForgotPasswordEmailValidationSchema,
    DeleteUserValidationSchema,
    UpdatePasswordValidationSchema,
} = require('../modules/user/user.validation');
const routes = express.Router();
const { body } = require('../../helpers/InputProperty/inputProperty');

routes.post(
    '/login', 
    validateRequest(LoginValidationSchema, body),
    loginUser
);

routes.post(
    '/signup', 
    validateRequest(CreateUserValidationSchema, body), 
    createUser
);

routes.post(
    '/update-profile', 
    validateRequest(UpdateProfileValidationSchema, body), 
    updateUserInfo
);

routes.post(
    '/delete',
    validateRequest(DeleteUserValidationSchema, body),
    deleteUser
)

routes.post(
    '/forgot-password', 
    validateRequest(ForgotPasswordEmailValidationSchema, body), 
    forgotPasswordEmail
);

routes.post(
    '/update-password',
    validateRequest(UpdatePasswordValidationSchema, body),
    updatePassword
)

module.exports = routes;
