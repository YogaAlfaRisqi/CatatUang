const { validationResult } = require('express-validator');
const ApiError = require('../../../utils/ApiError');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(err => ({
      field: err.param,
      message: err.msg
    }));
    
    throw new ApiError(400, 'Validation Error', true, JSON.stringify(errorMessages));
  }
  next();
};

module.exports = validate;