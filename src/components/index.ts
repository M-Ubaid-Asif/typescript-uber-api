import express from 'express'
import userRouter from './user/userRoutes'
import cabRouter from './cab/cabRoutes'
import bookRouter from './booking/bookingRoutes'
const router = express.Router()

router.use('/user', userRouter)
router.use('/cab', cabRouter)
router.use('/booking', bookRouter)
export default router
