/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { auth } from '../../middlewares/authentication.middleware'
import { createConsultasController } from '../../factories/express/controller.factory'

const consultasRouter = Router()
const controller = createConsultasController()

consultasRouter.post('/consultas', auth, controller.agendar)

export { consultasRouter }
