const Joi = require("joi");

const CreateUserRoleValidationSchema = Joi.object({
    userId: Joi.string().uuid().required(),
    roleId: Joi.string().uuid().required()
});

module.exports = {
    CreateUserRoleValidationSchema
}