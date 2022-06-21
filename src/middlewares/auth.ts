import { Request, Response, NextFunction } from 'express'
import AppError from 'utils/appError'
import { VerifyToken } from 'utils/jwt'

export const userAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.headers.authorization) {
      throw new AppError('Unauthorized', 401)
    }

    const token = req.headers.authorization.split(' ')[1]
    const decode = VerifyToken(token)
    if (!decode) {
      throw new AppError('Unauthorized', 401)
    }
    req.user = decode
    next()
  } catch (error) {
    next(error)
  }
}
