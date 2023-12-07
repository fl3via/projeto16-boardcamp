import { Router } from 'express'
import routerRentals from './rentals.routes.js'
import routerGames from './games.routes.js'
import routerCustomers from './customers.routes.js'

const router = Router()

router.use(routerRentals)
router.use(routerGames)
router.use(routerCustomers)

export default router