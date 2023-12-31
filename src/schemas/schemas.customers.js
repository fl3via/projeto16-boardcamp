import joiBase from 'joi'
import joiDate from '@joi/date'

const joi = joiBase.extend(joiDate)

export const customersSchema = joi.object({
  name: joi.string().required(),
  phone: joi.string().required().min(10).max(11).pattern(/^\d+$/),
  cpf: joi.string().length(11).pattern(/^\d+$/).required(),
  birthday: joi.date().format('YYYY-MM-DD').required()
})


