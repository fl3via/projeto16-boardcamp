import joi from 'joi'
import joiDate from '@joi/date'

export const clientesSchema = joi.object({

  name: joi.string().required(),
  phone: joi.string().required().min(10).max(11).required(),
  cpf: joi.string().length(11) .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  birthday: joi.date().format('YYYY-MM-DD').required()
})