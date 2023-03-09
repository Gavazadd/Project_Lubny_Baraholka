class ApiError extends Error{
  constructor(status, message, errors = []) {
    super(message);
    this.status = status
    this.errors = errors
  }

  static unAuthorizedError(){
    return new ApiError(401, 'Користувач не авторизований')
  }
  static badRequest(message, errors = []) {
    return new ApiError(404, message, errors)
  }
}

module.exports = ApiError