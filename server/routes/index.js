const Router = require('express')
const router = new Router()
const categoryRouter = require('./categoryRouter')
const deviceRouter = require('./deviceRouter')
const offerTypeRouter = require('./offerTypeRouter')
const userAuthRouter = require('./userAuthRouter')

router.use('/user', userAuthRouter)
router.use('/type', offerTypeRouter)
router.use('/category', categoryRouter)
router.use('/device', deviceRouter)

module.exports = router