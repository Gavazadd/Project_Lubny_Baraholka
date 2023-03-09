const Router = require('express')
const router = new Router()
const favouritesController = require('../controllers/favouritesController')

router.post('/', favouritesController.add)
router.get('/', favouritesController.getAll)
router.get('/check', favouritesController.getOne)
router.delete('/', favouritesController.destroyOne)

module.exports = router