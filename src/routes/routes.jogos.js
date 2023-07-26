import { Router } from 'express'


const routerJogos = Router()

routerJogos.get('/games', getListarJogos)  
routerJogos.post('/games', postInserirJogo) 

export default routerJogos