import { Router } from 'express'
import { getListaTodosClientes, getBuscarClienteId, postInserirClientes, putAtualizarCliente } from '../controllers/clientes.controllers.js'
import validateSchema from '../middlewares/schemas.validation.middlewares.js'
import {clientesSchema} from '../schemas/schemas.clientes.js'


const routerClientes = Router()

routerClientes.get('/customers', getListaTodosClientes) 
routerClientes.get('/customers/:id', getBuscarClienteId) 
routerClientes.post('/customers', validateSchema(clientesSchema), postInserirClientes)
routerClientes.put('/customers/:id', validateSchema(clientesSchema), putAtualizarCliente) 

export default routerClientes