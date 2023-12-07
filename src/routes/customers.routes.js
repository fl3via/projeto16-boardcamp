import { Router } from 'express'
import {  getAllCustomers, getCustomerById, postInsertCustomers, updateCustomer } from '../controllers/customers.controllers.js'
import { customersSchema } from '../schemas/schemas.customers.js'
import validateSchema from '../middlewares/schemas.validation.middlewares.js'

const routerCustomers = Router()

routerCustomers.get('/customers', getAllCustomers) 
routerCustomers.get('/customers/:id', getCustomerById) 
routerCustomers.post('/customers', validateSchema(customersSchema), postInsertCustomers)
routerCustomers.put('/customers/:id', validateSchema(customersSchema), updateCustomer) 

export default routerCustomers