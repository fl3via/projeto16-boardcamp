import joi from 'joi'

export const clientesSchema = joi.object({

  name: joi.string().required(),
  phone: joi.string().required().min(10).max(11).required(),
  cpf: joi.string().length(11).required(),
  birthday: joi.date().required()
})