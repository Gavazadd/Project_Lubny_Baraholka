const Router = require('express')
const router = new Router()
const {body} = require('express-validator');
const profileInfoController = require('../controllers/profileInfoController')

router.post('/',
    body('name').isLength({ min: 1 }),
    body('phone').isLength({ min: 9, max:9 }),
    profileInfoController.create)
router.put('/',
    body('name').isLength({ min: 1 }),
    body('phone').isLength({ min: 9, max:9 }),
    profileInfoController.rewrite)
router.get('/', profileInfoController.getOne)

module.exports = router