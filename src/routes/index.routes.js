import { Router } from 'express'
//import routerAlugueis from './alugueis.routes.js'
import routerJogos from './jogo.routes.js'
import routerClientes from './clientes.routes.js'

const router = Router()

//router.use(routerAlugueis)
router.use(routerJogos)
router.use(routerClientes)

export default router