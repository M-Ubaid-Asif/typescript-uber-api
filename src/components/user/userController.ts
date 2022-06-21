import { Request, Response, NextFunction } from 'express'
import AppError from '../../utils/appError'
import { loginInput, registerInput } from '../../helpers/validation'
import { create, findOneBy } from './userService'
import { GenerateToken } from '../../utils/jwt'
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

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await loginInput.validateAsync(req.body)
    const { email, password } = data
    const user = await findOneBy({ email })

    if (!user) {
      throw new AppError('Email is not registered!', 400)
    }

    const isValid = await user.comparePassword(password)

    if (!isValid) {
      throw new AppError('Incorrect password', 400)
    }

    const token = GenerateToken({
      _id: user._id,
      email: user.email,
      role: user.role,
    })
    return res.status(200).json({
      satus: 'success',
      message: 'login successful',
      data: { id: user._id, token },
    })
  } catch (error: any) {
    if (error.isJoi === true) {
      error.statusCode = 422
    }
    next(error)
  }
}
