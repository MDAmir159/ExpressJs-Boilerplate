const { UNPROCESSABLE_ENTITY, INTERNAL_SERVER_ERROR } = require('../HTTPStatus');
const joi = require('joi');

const validateRequest = (schema, property) => {
  return async (req, res, next) => {
    try {
      let { error } = schema.validate(req[property]);
      if(error) {
        return next(error)
      }
      return next();
    } catch (error) {
      next(error)
    }
  };
};

module.exports = {
  validateRequest
};
