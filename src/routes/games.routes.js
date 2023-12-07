import { Router } from 'express'
import { getAllGames, postInsertGame } from '../controllers/games.controllers.js'
import {gameSchema} from '../schemas/schemas.game.js'
import validateSchema from '../middlewares/schemas.validation.middlewares.js'

const routerGames = Router()

routerGames.get('/games', getAllGames) 
routerGames.post('/games', validateSchema(gameSchema), postInsertGame) 

export default routerGames