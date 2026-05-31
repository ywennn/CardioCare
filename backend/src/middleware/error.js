import response from '../utils/response.js';
import { ClientError } from '../exceptions/index.js';
import logger from '../utils/logger.js';
const ErrorHandler = (err, req, res, next) => {
  logger.error(`${err.message}`, {
    stack: err.stack,
    path: req.path,
    method: req.method,
  });
  if (err instanceof ClientError)
    return response(res, err.statusCode, err.message, null);
  if (err.isJoi) return response(res, 400, err.details[0].message, null);
  if (err.isAxiosError || err.code === 'ECONNREFUSED') {
    return response(res, 503, 'Service unavailable. Silahkan coba lagi', null);
  }
  if (err.code && err.code.startsWith('23')) {
    return response(res, 400, 'Database error', null);
  }
  const status = err.statusCode || err.status || 500;
  const message = err.message || 'Internal Server Error';
  console.error('Unhandled error:', err);
  return response(res, status, message, null);
};

export default ErrorHandler;
