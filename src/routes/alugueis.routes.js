/*import { Router } from 'express'
import { getListarAlugueis, postInserirAluguel, postFinalizarAluguel, apagarAluguel } from '../controllers/aluguel.controllers.js'
import validateSchema from '../middlewares/schemas.validation.middlewares.js'
import {aluguelSchema} from '../schemas/schemas.aluguel.js'

const routerAlugueis = Router()

routerAlugueis.get('/rentals', getListarAlugueis) 
routerAlugueis.post('/rentals',validateSchema(aluguelSchema), postInserirAluguel)  
routerAlugueis.post('/rentals/:id/return', postFinalizarAluguel)  
routerAlugueis.delete('/rentals/:id', apagarAluguel) 

export default routerAlugueis */