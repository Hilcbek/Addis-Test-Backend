import httpStatus from 'http-status';

import AppError from './APPError.js';
/**
 * @augments AppError
 */

class APIError extends AppError {
  constructor(
    message,
    status = httpStatus.INTERNAL_SERVER_ERROR,
    isPublic = false
  ) {
    super(message, status, isPublic);
  }
}

export default APIError;
