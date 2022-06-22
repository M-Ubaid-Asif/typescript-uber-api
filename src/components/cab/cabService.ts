import Cab from './cabModel'
import { cabInput, TCab } from './types'

export const createCab = async (data: cabInput): Promise<TCab | boolean> => {
  const doc = await Cab.create(data)
  return doc ? doc : false
}

export const findOneCabBy = async (filter: any): Promise<TCab | boolean> => {
  if (!filter) {
    filter = {}
  }
  filter.isDeleted = false
  const doc = await Cab.findOne(filter)
  return doc ? doc : false
}

export const getAllcabs = async (): Promise<TCab[] | boolean> => {
  const doc = await Cab.find({ isDeleted: false })
  return doc ? doc : false
}

export const updateCabService = async (
  _id: string,
  data: Partial<cabInput>
): Promise<TCab | boolean> => {
  const doc = await Cab.findOne({ _id })
  if (!doc) {
    return false
  }
  doc.set(data)
  const updateddoc = await doc.save()
  return updateddoc ? updateddoc : false
}

export const deleteService = async (_id: string): Promise<boolean> => {
  const cab = await Cab.findOne({ _id, isDeleted: false })
  if (!cab) {
    return false
  }
  cab.isDeleted = true
  const doc = await cab.save()
  return doc ? true : false
}
