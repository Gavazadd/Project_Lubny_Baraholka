const Router = require('express')
const router = new Router()
const {body} = require('express-validator');
const userAuthController = require('../controllers/userAuthController')
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/registration',
  body('email').isEmail(),
  body('password').isLength({min: 5, max: 32}),
  userAuthController.registration)
router.post('/login', userAuthController.login)
router.get('/activate/:link', userAuthController.activate)
router.get('/check', authMiddleware, userAuthController.check)

module.exports = router