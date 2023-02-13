const {UserInfo, UserAdditionalInfo} = require('../models/models')
const ApiError = require('../error/ApiError')
const imgService = require('../services/imgService/create-img')

class ProfileController {
  async create(req, res, next) {
    try{
      let {name, phone, userId, info} =  req.body
      const {img} = req.files
      const createdImg = await imgService.createImg(img)
      const userInfo = await UserInfo.create({name, phone, userId, img: createdImg})

      if (info) {
        JSON.parse(info).forEach(i =>
          UserAdditionalInfo.create({
            title: i.title,
            description: i.description,
            userInfoId: userInfo.id
          })
        )
      }
      return res.json(userInfo)
    }catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async rewrite(req, res) {

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

module.exports = new ProfileController()