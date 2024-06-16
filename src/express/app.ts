import express from 'express'
import { medicosRouter } from './routes/medicos.route'
import { pacientesRouter } from './routes/pacientes.route'

const app = express()

app.use(express.json())
app.use(medicosRouter)
app.use(pacientesRouter)

export default app
