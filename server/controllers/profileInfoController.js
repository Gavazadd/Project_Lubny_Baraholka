const {UserInfo, UserAdditionalInfo, User, UserImg} = require('../models/models')
const ApiError = require('../error/ApiError')
const {validationResult} = require('express-validator')

class ProfileInfoController {
  async create(req, res, next) {
    try{
      let {name, phone, userId, info} =  req.body
      const errors = validationResult(req)
      if (!errors.isEmpty()){
        return next(ApiError.badRequest('Уведіть коректне ім\'я та номер телефону', errors.array()))
      }

      const userInfo = await UserInfo.create({name, phone, userId})
      if (info) {
        JSON.parse(info).forEach(i =>
          UserAdditionalInfo.create({
            title: i.title,
            description: i.description,
            userInfoId: userInfo.id
          })
        )
      }
      await UserImg.create({userId})
      const user = await User.findOne({where:{id: userId}})
      user.isUserInfo = true;
      await user.save();
      return res.json(userInfo)
    }catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async rewrite(req, res, next) {
    try{
      let {name, phone, userId, info} =  req.body
      const errors = validationResult(req)
      if (!errors.isEmpty()){
        return next(ApiError.badRequest('Уведіть коректне ім\'я та номер телефону', errors.array()))
      }

      await UserInfo.update({name, phone, userId}, {where:{userId}})
      const userInfo = await UserInfo.findOne({where:{userId}})

      const userInfoId = userInfo.id
      await UserAdditionalInfo.destroy({where:{userInfoId}})

      if (info) {
        JSON.parse(info).forEach(i =>
            UserAdditionalInfo.create({
              title: i.title,
              description: i.description,
              userInfoId: userInfo.id
            },{
              where:{userInfoId}
            })
        )
      }

      return res.json(userInfo)
    }catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }


  async getOne(req, res) {
    const {userId} = req.query
    const userInfo = await UserInfo.findOne(
      {
        where: {userId},
        include: [{model: UserAdditionalInfo, as: 'additional_info'}]
      },
    )
    return res.json(userInfo)
  }
}

module.exports = new ProfileInfoController()