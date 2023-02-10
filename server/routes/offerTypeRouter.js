const Router = require('express')
const router = new Router()
const offerTypeController = require('../controllers/offerTypeController')
const checkRole = require("../middlewares/checkRoleMiddleware");

router.post('/', offerTypeController.create)
router.get('/', offerTypeController.getAll)
router.delete('/', offerTypeController.delete)

module.exports = router