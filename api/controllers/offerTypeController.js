const {OfferType} = require('../models/models')

class offerTypeController {
  async create(req, res) {
    const {name} = req.body
    const offerType = await OfferType.create({name})
    return res.json(offerType)
  }
  async delete(req, res) {
    const {name} = req.body
    const offerType = await OfferType.destroy( {where: {name}})
    res.json(offerType)
  }

  async getAll(req, res) {
    const offerTypes = await OfferType.findAll()
    return res.json(offerTypes)
  }

}

module.exports = new offerTypeController()