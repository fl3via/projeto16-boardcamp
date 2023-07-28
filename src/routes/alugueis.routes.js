import { Router } from 'express'
import { getListarAlugueis, postInserirAluguel, postFinalizarAluguel, apagarAluguel } from '../controllers/aluguel.controllers.js'

const routerAlugueis = Router()

routerAlugueis.get('/rentals', getListarAlugueis) 
routerAlugueis.get('/rentals', postInserirAluguel)  
routerAlugueis.post('/rentals/:id/return', postFinalizarAluguel)  
routerAlugueis.delete('/rentals/:id', apagarAluguel) 

export default routerAlugueis