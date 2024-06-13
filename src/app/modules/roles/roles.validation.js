const Joi = require("joi");

const CreateRoleValidationSchema = Joi.object({
    roleName: Joi.string().required()
})

module.exports = {
    CreateRoleValidationSchema
}