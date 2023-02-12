const jwt = require('jsonwebtoken')
const tokenService = require('../services/authService/token-service');
const ApiError = require("../error/ApiError");

module.exports = function(role) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next()
    }
    try {
      const token = req.headers.authorization.split(' ')[1]
      if (!token) {
        return next(ApiError.unAuthorizedError());
      }

      const decodeToken = tokenService.validateToken(token);
      if (decodeToken.role !== role) {
        return res.status(403).json({message: "Нет доступа"})
      }
      req.user = decodeToken;
      next()
    } catch (e) {
      return next(ApiError.unAuthorizedError());
    }
  };
}