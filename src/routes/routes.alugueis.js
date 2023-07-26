import { Router } from 'express'

const routerAlugueis = Router()

routerAlugueis.get('/rentals', getListarAlugueis) 
routerAlugueis.get('/rentals', postInserirAluguel)  
routerAlugueis.post('/rentals/:id/return', postFinalizarAluguel)  
routerAlugueis.delete('/rentals/:id', apagarAluguel) 

export default routerAlugueis