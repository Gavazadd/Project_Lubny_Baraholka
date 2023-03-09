const ApiError = require('../error/ApiError');
const tokenService = require('../services/authService/token-service');

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next()
  }
  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      return next(ApiError.unAuthorizedError());
    }

    const decodeToken = tokenService.validateToken(token, process.env.SECRET_KEY)

    req.user = decodeToken;
    next();
  } catch (e) {
    return next(ApiError.unAuthorizedError());
  }
};