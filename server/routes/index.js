const Router = require('express')
const router = new Router()
const categoryRouter = require('./categoryRouter')
const deviceRouter = require('./deviceRouter')
const favouritesRouter = require('./favouritesRouter')
const offerTypeRouter = require('./offerTypeRouter')
const userAuthRouter = require('./userAuthRouter')
const userProfileInfoRouter = require('./profileInfoRouter')
const userProfileImageRouter = require('./profileImageRouter')


router.use('/user', userAuthRouter)
router.use('/type', offerTypeRouter)
router.use('/category', categoryRouter)
router.use('/device', deviceRouter)
router.use('/favourites', favouritesRouter)
router.use('/userInfo', userProfileInfoRouter)
router.use('/userImg', userProfileImageRouter)

module.exports = router