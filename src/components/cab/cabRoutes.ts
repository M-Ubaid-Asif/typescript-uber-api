import express from 'express'
import { userAuth } from '../../middlewares/auth'
import { addCab, deleteCab, getcab, getCabs, updateCab } from './cabController'

const router = express.Router()

router.post('/addcab', userAuth, addCab)
router.get('/', userAuth, getCabs)
router.get('/:id', userAuth, getcab)
router.patch('/:id', userAuth, updateCab)
router.delete('/:id', userAuth, deleteCab)

export default router
