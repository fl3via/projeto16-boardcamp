import { Router } from 'express'
import { getListRentals, postInsertRental, postFinishRental, deleteRental } from '../controllers/rentals.controllers.js'
import { rentalsSchema } from '../schemas/schemas.rentals.js'
import validateSchema from '../middlewares/schemas.validation.middlewares.js'

const routerRentals = Router()

routerRentals.get('/rentals', getListRentals) 
routerRentals.post('/rentals',validateSchema(rentalsSchema), postInsertRental)  
routerRentals.post('/rentals/:id/return', postFinishRental)  
routerRentals.delete('/rentals/:id', deleteRental) 

export default routerRentals 