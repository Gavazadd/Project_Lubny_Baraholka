const {User} = require("../../models/models");
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mail-service')
const tokenService = require('./token-service')
const ApiError = require('../../error/ApiError')
class UserService {
    async registration (email, password){
      const candidate = await User.findOne({where: {email}})
      if (candidate){
        throw ApiError.badRequest(`Користувач з почтовою адресою ${email} вже існує`)
      }
      const hashPassword = await bcrypt.hash(password, 5)
      const activationLink = uuid.v4()
      const user = await User.create({email, password: hashPassword, activationLink})
      await mailService.sendActivationMail(email, `${process.env.API_URL}/api/user/activate/${activationLink}`)
      const token = tokenService.generateJwt(user.id, user.email, user.isUserInfo, user.role)

      return {token}
    }
    async activate(activationLink){
      const user = await User .findOne({where:{activationLink}})
      if (!user) {
        throw ApiError.badRequest('Некоректне посилання активації')
      }
      user.isActivated = true;
      await user.save();
    }

  async login(email, password) {
    const user = await User.findOne({where:{email}})
    if (!user) {
      throw ApiError.badRequest('Користувача з таким email не знайдено')
    }
    const isPasswordEquals = await bcrypt.compare(password, user.password);
    if (!isPasswordEquals) {
      throw ApiError.badRequest('Невірний пароль');
    }

    if (!user.isActivated) {
      throw ApiError.badRequest('Непідтверджений аккаунт. Будь ласка перевірте вашу пошту')
    }
    const token = tokenService.generateJwt(user.id, user.email, user.isUserInfo, user.role)

    return {token}
  }


  async checking(id) {
    const user = await User.findOne({where:{id}})
    const token = tokenService.generateJwt(user.id, user.email, user.isUserInfo, user.role)
    return token
  }

}

module.exports = new UserService()