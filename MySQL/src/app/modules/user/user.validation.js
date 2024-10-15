const Joi = require("joi");

const LoginValidationSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
});

const CreateUserValidationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

const UpdateProfileValidationSchema = Joi.object({
    userName: Joi.string(),
    name: Joi.string(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().pattern(new RegExp('^[0-9]+$')),
    id: Joi.string().uuid().required()
});

const DeleteUserValidationSchema = Joi.object({
    email: Joi.string().email().required()
})

const ForgotPasswordEmailValidationSchema = Joi.object({
    email: Joi.string().email().required()
})

const UpdatePasswordValidationSchema = Joi.object({
    email: Joi.string().email().required(),
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().required(),
})

const RetrieveUserHistoryValidationSchema = Joi.object({
    email: Joi.string().email().required()
})

const CreateSuperAdminSeedUserValidationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    roleName: Joi.string().required()
})

module.exports = {
    CreateUserValidationSchema,
    LoginValidationSchema,
    RetrieveUserHistoryValidationSchema,
    UpdateProfileValidationSchema,
    ForgotPasswordEmailValidationSchema,
    CreateSuperAdminSeedUserValidationSchema,
    DeleteUserValidationSchema,
    UpdatePasswordValidationSchema
}