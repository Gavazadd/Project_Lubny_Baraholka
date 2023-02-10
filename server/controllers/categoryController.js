const {Category} = require('../models/models')

class CategoryController {
  async create(req, res) {
    const {name} = req.body
    const category = await Category.create({name})
    return res.json(category)
  }
  async delete(req, res) {
    const {name} = req.body
    const category = await Category.destroy( {where: {name}})
    res.json(category)
  }
  async getAll(req, res) {
    const categories = await Category.findAll()
    return res.json(categories)
  }
}

module.exports = new CategoryController()