import { Document } from 'mongoose'
export interface userInput {
  name: string
  email: string
  password: string
  phoneNo: string
  role?: string
}

export interface TUser extends userInput, Document {
  isDeleted: boolean
  comparePassword: (password: string) => boolean
}
