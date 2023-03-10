const Router = require('express')
const router = new Router()
const deviceController = require('../controllers/deviceController')

router.post('/', deviceController.create)
router.get('/', deviceController.getAll)
router.get('/userDevices', deviceController.getUserDevices)
router.get('/:id', deviceController.getOne)
router.delete('/', deviceController.destroyOne)

module.exports = router