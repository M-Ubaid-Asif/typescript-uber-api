import db from '../../connections/masterDB'
import mongoose from 'mongoose'
import { TCab } from './types'
const { Schema } = mongoose

// Create Schema for cab
const cabSchema = new Schema({
  booked: {
    type: Boolean,
    default: false,
  },
  currentLoc: {
    //GeoJSON
    type: {
      type: String,
      default: 'Point',
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
      required: true,
    }, //[lng, lat]
  },
  driver: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'A Cab must have a driver'],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
})

//Populate the driver

cabSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'driver',
    select: { name: 1, phoneNo: 1, email: 1 },
  })
  next()
})

cabSchema.index({ location: '2d' })

//Model from schema
const Cab = db.model<TCab>('Cab', cabSchema)

export default Cab
