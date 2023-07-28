import { Router } from 'express'
import { getListaTodosClientes, getBuscarClienteId, putAtualizarCliente } from '../controllers/clientes.controllers.js'


const routerClientes = Router()

routerClientes.get('/customers', getListaTodosClientes) 
routerClientes.get('/customers/:id', getBuscarClienteId) 
routerClientes.put('/customers/:id', putAtualizarCliente) 

export default routerClientes