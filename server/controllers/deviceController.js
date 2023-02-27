const {Device, DeviceInfo, FavouriteDevice} = require('../models/models')
const ApiError = require('../error/ApiError')
const imgService = require("../services/imgService/create-img");

class DeviceController {
  async create(req, res, next) {
    try{
      let {name, price, userId, categoryId, offerTypeId, info} =  req.body
      const {img} = req.files
      const createdImg = await imgService.createImg(img)
      const device = await Device.create({name, price, userId, categoryId, offerTypeId, img: createdImg})

      if (info) {
        JSON.parse(info).forEach(i =>
          DeviceInfo.create({
            title: i.title,
            description: i.description,
            deviceId: device.id
          })
        )
      }
      return res.json(device)
    }catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res) {
    let {categoryId, offerTypeId, limit, page} = req.query
    page = page || 1
    limit = limit || 9
    let offset = page * limit - limit
    let devices;
    if (!categoryId && !offerTypeId) {
      devices = await Device.findAndCountAll({limit, offset})
    }
    if (categoryId && !offerTypeId) {
      devices = await Device.findAndCountAll({where:{categoryId}, limit, offset})
    }
    if (!categoryId && offerTypeId) {
      devices = await Device.findAndCountAll({where:{offerTypeId}, limit, offset})
    }
    if (categoryId && offerTypeId) {
      devices = await Device.findAndCountAll({where:{offerTypeId, categoryId}, limit, offset})
    }
    return res.json(devices)
  }

  async getUserDevices(req, res) {
    let {userId} = req.query

    const devices = await Device.findAndCountAll({where:{userId}})
    return res.json(devices)
  }


  async getOne(req, res) {
    const {id} = req.params
    const device = await Device.findOne(
      {
        where: {id},
        include: [{model: DeviceInfo, as: 'info'}]
      },
    )
    return res.json(device)
  }

  async destroyOne(req, res) {
    const {id} = req.query
    const deviceInfo = await DeviceInfo.destroy({where: {deviceId: id}})
    const favouriteDevice = await FavouriteDevice.destroy({where: {deviceId: id}})
    const device = await Device.destroy({where: {id}})
    return res.json([device, deviceInfo, favouriteDevice])
  }
}




module.exports = new DeviceController()