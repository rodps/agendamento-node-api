import express from 'express'
import { errorHandler } from './middlewares/error-handler.middleware'
import { consultasRouter } from './api/consultas/consultas.router'
import { medicosRouter } from './api/medicos/medicos.router'
import { pacientesRouter } from './api/pacientes/pacientes.router'
import { authRouter } from './api/auth/auth.router'

const app = express()
const router = express.Router()

router.use(authRouter)
router.use(consultasRouter)
router.use(medicosRouter)
router.use(pacientesRouter)

app.use(express.json())
app.use(router)
app.use(errorHandler)

export default app
