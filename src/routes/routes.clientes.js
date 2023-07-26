import { Router } from 'express'


const routerClientes = Router()

routerClientes.get('/customers', getListaTodosClientes) 
routerClientes.get('/customers/:id', getBuscarClienteId) 
routerClientes.put('/customers/:id', putAtualizarCliente) 

export default routerClientes