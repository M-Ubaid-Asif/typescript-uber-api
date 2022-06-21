import { userInput } from './types'
import User from './userModel'

export const create = async (input: userInput) => {
  const doc = await User.create(input)
  return doc ? doc : false
}

export const findOneBy = async (filter: any) => {
  const doc = await User.findOne(filter)
  return doc ? doc : false
}
