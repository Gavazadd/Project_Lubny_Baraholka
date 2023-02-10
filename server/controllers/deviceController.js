const uuid = require('uuid')
const path = require('path')
const {Device, DeviceInfo} = require('../models/models')
const ApiError = require('../error/ApiError')

class DeviceController {
  async create(req, res, next) {
    try{
      let {name, price, categoryId, offerTypeId, info} =  req.body
      const {img} = req.files
      let filename = uuid.v4() + '.jpg'
      await img.mv(path.resolve(__dirname, '..', 'static', filename))
      const device = await Device.create({name, price, categoryId, offerTypeId, img: filename})

      if (info) {
        info = JSON.parse(info)
        info.forEach(i =>
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
    console.log(req.query)
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
}

module.exports = new DeviceController()