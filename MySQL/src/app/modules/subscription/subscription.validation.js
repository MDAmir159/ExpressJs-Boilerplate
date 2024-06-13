const Joi = require('joi');

const CommonIdValidationSchema = Joi.object({
    id: Joi.string().uuid().required()
});

const CreateSubscriptionValidationsSchema = Joi.object({
    name: Joi.string().required(),
    pricing: Joi.number().required()
});

const GetSubscriptionByIdValidationSchema = CommonIdValidationSchema;

const UpdateSubscriptionValidationsSchema = CreateSubscriptionValidationsSchema.keys({
    id: Joi.string().required()
});

const DeleteSubscriptionByIdValidationSchema = CommonIdValidationSchema;

module.exports = {
    CreateSubscriptionValidationsSchema,
    GetSubscriptionByIdValidationSchema,
    DeleteSubscriptionByIdValidationSchema,
    UpdateSubscriptionValidationsSchema
    // CreateHospitalValidationSchema
}
