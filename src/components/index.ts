import express from 'express'
import userRouter from './user/userRoutes'
import cabRouter from './cab/cabRoutes'

const router = express.Router()

router.use('/user', userRouter)
router.use('/cab', cabRouter)
export default router
