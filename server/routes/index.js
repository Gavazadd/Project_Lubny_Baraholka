const Router = require('express')
const router = new Router()
const categoryRouter = require('./categoryRouter')
const deviceRouter = require('./deviceRouter')
const offerTypeRouter = require('./offerTypeRouter')
const userAuthRouter = require('./userAuthRouter')
const userProfileRouter = require('./profileRouter')


router.use('/user', userAuthRouter)
router.use('/type', offerTypeRouter)
router.use('/category', categoryRouter)
router.use('/device', deviceRouter)
router.use('/userInfo', userProfileRouter)

module.exports = router