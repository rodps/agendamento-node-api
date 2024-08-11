import express from 'express'
import { consultasRouter } from './routes/consultas.router'
import { medicosRouter } from './routes/medicos.router'
import { pacientesRouter } from './routes/pacientes.router'
import { usuariosRouter } from './routes/usuarios.router'

const app = express()
const router = express.Router()

router.use(consultasRouter)
router.use(medicosRouter)
router.use(pacientesRouter)
router.use(usuariosRouter)

app.use(express.json())
app.use(router)

export default app
