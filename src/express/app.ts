import express from 'express'
import { errorHandler } from './middlewares/error-handler.middleware'
import { consultasRouter } from './api/consultas/consultas.router'
import { medicosRouter } from './api/medicos/medicos.router'
import { pacientesRouter } from './api/pacientes/pacientes.router'
import { usuariosRouter } from './api/usuarios/usuarios.router'

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
