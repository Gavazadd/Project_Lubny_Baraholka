const userService = require('../services/authService/user-service')
const {validationResult} = require('express-validator')
const ApiError = require('../error/ApiError')


class UserAuthController {
  async registration(req, res, next) {
    try{
      const errors = validationResult(req)
      if (!errors.isEmpty()){
        return next(ApiError.badRequest('Уведіть коректний email та пароль розміром від 5 до 32 символів', errors.array()))
      }
      const {email, password, role} = req.body
      const userData = await userService.registration(email, password)
      res.json(userData)
    }catch (e) {
      next(e)
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link
      await userService.activate(activationLink)
      return res.redirect (process.env.CLIENT_URL)
    }catch (e) {
      next(e)
    }
  }

  async login(req, res, next) {
    try{
      const {email, password} = req.body
      const userData = await userService.login(email, password)
      return res.json(userData)
    }catch (e) {
      next(e)
    }
  }

  async check (req, res, next) {
    try{
      const userId = req.user.id
      const userData = await userService.checking(userId)
      return res.json(userData)
    }catch (e) {
      next(e)
    }
  }

}


module.exports = new UserAuthController();