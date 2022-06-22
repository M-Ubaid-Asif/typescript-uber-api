import Joi, { ObjectSchema } from '@hapi/joi'

export const registerInput: ObjectSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Name must not be empty',
    'string.base': 'Name should be a type of string',
    'any.required': 'Name is required',
  }),
  email: Joi.string().email().lowercase().required().messages({
    'string.empty': 'Email must not be empty',
    'string.base': 'Email should be a type of string',
    'any.required': 'Email is required',
    'string.email': 'Invalid email',
  }),
  password: Joi.string().min(4).required().messages({
    'string.min': 'Password should be atleast 4 character long',
    'string.empty': 'Password must not be empty',
    'any.required': 'Password is required',
  }),
  confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
    'any.only': 'Password do not match',
    'any.required': 'Confirm password is required',
  }),
  role: Joi.string().lowercase().messages({
    'string.empty': 'Role must not be empty',
    'string.base': 'Role should be a type of string',
  }),
  phoneNo: Joi.number().min(10).required().messages({
    'number.empty': 'Phone no. must not be empty',
    'number.base': 'Phone no. should be type of number',
    'number.min': 'Invalid phone no.',
    'any.required': 'Phone no. is required',
  }),
})

export const loginInput: ObjectSchema = Joi.object({
  email: Joi.string().email().lowercase().required().messages({
    'string.empty': 'Email must not be empty',
    'string.base': 'Email should be a type of string',
    'any.required': 'Email is required',
    'string.email': 'Invalid email',
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password must not be empty',
    'any.required': 'Password is required',
  }),
})

export const cabInput: ObjectSchema = Joi.object({
  driver: Joi.string().required().messages({
    'string.empty': 'driver must not be empty',
    'any.required': 'driver is required',
  }),
  currentLoc: Joi.object({
    coordinates: Joi.array().required().length(2).messages({
      'array.empty': 'cordinates must not be empty',
      'any.required': 'coordinates is required field in currentLoc',
      'array.base': 'coordinates must be provided in an array',
      'array.length': 'please provide lat and lan in coordinates',
    }),
  })
    .required()
    .messages({
      'object.empty': 'currentLoc must not be empty',
      'any.required': 'currentLoc is required',
      'object.base': 'currentLoc must be provided in an object',
    }),
})

export const cabUpdateInput: ObjectSchema = Joi.object({
  driver: Joi.string().messages({
    'string.empty': 'driver must not be empty',
    'string.base': 'driver must be a string',
  }),
  currentLoc: Joi.object({
    coordinates: Joi.array().required().length(2).messages({
      'array.empty': 'cordinates must not be empty',
      'any.required': 'coordinates is required field in currentLoc',
      'array.base': 'coordinates must be provided in an array',
      'array.length': 'please provide lat and lan in coordinates',
    }),
  }).messages({
    'object.empty': 'currentLoc must not be empty',
    'object.base': 'currentLoc must be provided in an object',
  }),
})
