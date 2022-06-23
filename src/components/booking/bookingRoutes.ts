import express from 'express'
import { userAuth } from '../../middlewares/auth'
import {
  bookCabByid,
  cancelBooking,
  createBooking,
  dropped,
  getAllBookings,
  getdriverbooking,
  getMyBookings,
} from './bookingController'

const router = express.Router()

router.post('/', userAuth, createBooking)
router.post('/:cabId', userAuth, bookCabByid)
router.get('/', userAuth, getAllBookings)

router.get('/history', userAuth, getMyBookings)
router.get('/driver', userAuth, getdriverbooking)

router.delete('/:id', userAuth, cancelBooking)
router.delete('/complete/:id', userAuth, dropped)

export default router
