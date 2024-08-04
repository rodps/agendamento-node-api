import express from 'express'
import { errorHandler } from './middlewares/error-handler.middleware'
import { consultasRouter, medicosRouter, pacientesRouter, usuariosRouter } from './routes'

const app = express()
const router = express.Router()

router.use(consultasRouter)
router.use(medicosRouter)
router.use(pacientesRouter)
router.use(usuariosRouter)

app.use(express.json())
app.use(router)
app.use(errorHandler)

export default app
