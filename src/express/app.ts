import express from 'express'
import medicosRouter from './routes/medicos.route'

const app = express()

app.use(express.json())
app.use(medicosRouter)

export default app
