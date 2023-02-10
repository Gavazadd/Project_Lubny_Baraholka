const Router = require('express')
const router = new Router()
const categoryController = require('../controllers/categoryController')
const checkRole = require('../middlewares/checkRoleMiddleware')

router.post('/',  categoryController.create)
router.get('/', categoryController.getAll)
router.delete('/', categoryController.delete)


module.exports = router