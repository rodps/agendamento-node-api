/* eslint-disable @typescript-eslint/no-var-requires */
import express from 'express'
import { errorHandler } from './middlewares/error-handler.middleware'

const app = express()
const router = express.Router()

require('./routes/consultas.router')(router)
require('./routes/medicos.router')(router)
require('./routes/pacientes.router')(router)

app.use(express.json())
app.use(router)
app.use(errorHandler)

export default app
