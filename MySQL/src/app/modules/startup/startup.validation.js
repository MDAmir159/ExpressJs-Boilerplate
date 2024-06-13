const Joi = require("joi");

const CreateSuperAdminSeedUserValidationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

module.exports = {
    CreateSuperAdminSeedUserValidationSchema
}