import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { TUser } from './types'
import db from '../../connections/masterDB'

const { Schema } = mongoose

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'user', 'driver'],
      default: 'user',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.password
        delete ret._v
        return ret
      },
    },
  }
)

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const hashPass = await bcrypt.hash(this.password, 12)
    this.password = hashPass
    next()
  }
  next()
})

userSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password)
}

export default db.model<TUser>('User', userSchema)
