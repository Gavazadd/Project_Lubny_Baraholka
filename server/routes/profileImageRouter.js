const Router = require('express')
const router = new Router()
const profileImageController = require('../controllers/profileImageController')

router.put('/', profileImageController.rewrite)
router.get('/', profileImageController.getOne)

module.exports = router