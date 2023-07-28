import { Router } from 'express'
import { getListarJogos, postInserirJogo } from '../controllers/jogo.controllers.js'
import validateSchema from '../middlewares/schemas.validation.middlewares.js'
import {gameSchema} from '../schemas/schemas.game.js'


const routerJogos = Router()

routerJogos.get('/games', getListarJogos) 
routerJogos.post('/games', validateSchema(gameSchema), postInserirJogo) 

export default routerJogos