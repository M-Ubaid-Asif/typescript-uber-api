import { Request, Response, NextFunction } from 'express'
import AppError from '../../utils/appError'
import { registerInput } from '../../helpers/validation'
import { create, findOneBy } from './userService'
export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //   validate req.body for register
    const data = await registerInput.validateAsync(req.body)
    // check email is already registered?
    const isExist = await findOneBy({ email: data.email })
    if (isExist) {
      throw new AppError('Email is already registered', 409)
    }
    // check for role admin
    if (data.role === 'admin') {
      const checkAdmin = await findOneBy({ role: 'admin' })
      if (checkAdmin) {
        throw new AppError(
          'Admin is already exist please login as a user or driver',
          400
        )
      }
    }
    const doc = await create(data)
    return res
      .status(200)
      .json({ status: 'success', message: 'Registration success', data: doc })
  } catch (error) {
    if (error.isJoi === true) {
      error.statusCode = 422
    }
    next(error)
  }
}
