const Router = require('express')
const router = new Router()
const profileController = require('../controllers/profileController')

router.post('/', profileController.create)
router.put('/', profileController.rewrite)
router.get('/', profileController.getOne)

module.exports = router