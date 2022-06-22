import { Request, Response, NextFunction } from 'express'
import { cabInput, cabUpdateInput } from '../../helpers/validation'
import AppError from '../../utils/appError'
import {
  createCab,
  deleteService,
  findOneCabBy,
  getAllcabs,
  updateCabService,
} from './cabService'

export const addCab = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.user.role !== 'admin') {
      throw new AppError('only admin can add cab', 400)
    }
    const data = await cabInput.validateAsync(req.body)
    const { driver } = data

    // check driver is already cab driver or not
    const isAlreadyCabDriver = await findOneCabBy({ driver })

    if (isAlreadyCabDriver) {
      throw new AppError('Already a cab driver', 400)
    }
    const doc = await createCab(data)
    return res
      .status(200)
      .json({ status: 'success', message: 'cab added', data: doc })
  } catch (error) {
    if (error.isJoi === true) {
      error.statusCode = 422
    }
    next(error)
  }
}

export const getCabs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.user.role !== 'admin') {
      throw new AppError('only admin can get cabs', 400)
    }
    const cabs = await getAllcabs()
    return res
      .status(200)
      .json({ status: 'success', message: 'successfull', data: cabs })
  } catch (error) {
    next(error)
  }
}

export const getcab = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.user.role !== 'admin') {
      throw new AppError('only admin can get cab', 400)
    }
    const _id = req.params.id
    const cab = await findOneCabBy({ _id })
    if (!cab) {
      throw new AppError('cab not found', 403)
    }
    return res
      .status(200)
      .json({ status: 'success', message: 'successfull', data: cab })
  } catch (error) {
    next(error)
  }
}

export const updateCab = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.user.role !== 'admin') {
      throw new AppError('only admin can update cab', 400)
    }
    const _id = req.params.id
    const data = await cabUpdateInput.validateAsync(req.body)
    const cab = await updateCabService(_id, data)
    return res
      .status(200)
      .json({ status: 'success', message: 'successfull', data: cab })
  } catch (error) {
    next(error)
  }
}

export const deleteCab = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.user.role !== 'admin') {
      throw new AppError('only admin can delete cab', 400)
    }
    const _id = req.params.id
    const deletedCab = await deleteService(_id)
    if (!deletedCab) {
      throw new AppError('cab not found or already deleted', 400)
    }

    return res.status(200).json({
      status: 'success',
      message: 'cab deleted successfully',
    })
  } catch (error) {
    next(error)
  }
}
