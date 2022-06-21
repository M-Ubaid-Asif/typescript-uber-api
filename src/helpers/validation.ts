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
    'string.empty': 'Phone no. must not be empty',
    'string.base': 'Phone no. should be type of number',
    'string.min': 'Invalid phone no.',
    'any.required': 'Phone no. is required',
  }),
})
