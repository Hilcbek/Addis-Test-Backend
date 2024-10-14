import { validationResult } from 'express-validator';
import httpStatus from 'http-status';

const parser = (req, res, next) => {
  const validationErrors = validationResult(req);

  if (validationErrors.isEmpty()) {
    return next();
  }

  next(validationErrors);
};

export default parser;
