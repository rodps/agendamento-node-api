/* eslint-disable @typescript-eslint/no-var-requires */
import express from 'express'
import { medicosRouter } from './routes/medicos.route'
import { pacientesRouter } from './routes/pacientes.route'

const app = express()
const router = express.Router()

require('./routes/consultas.route')(router)

app.use(express.json())
app.use(router)
app.use(medicosRouter)
app.use(pacientesRouter)

export default app
