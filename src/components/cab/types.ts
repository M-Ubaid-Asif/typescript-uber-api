import { Document } from 'mongoose'

export interface cabInput {
  booked: boolean
  currentLoc: locType
  driver: string
  isDeleted: boolean
}

interface locType {
  type: string
  coordinates: number[]
}

export interface TCab extends cabInput, Document {}
