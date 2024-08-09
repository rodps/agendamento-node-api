import { Router } from 'express'
import { auth } from '../middlewares/authentication.middleware'
import { ConsultasFactory } from '../factories/consultas.factory'

const consultasRouter = Router()

const controller = new ConsultasFactory().createConsultasController()

consultasRouter.post('/consultas', auth, controller.agendar)

export { consultasRouter }
