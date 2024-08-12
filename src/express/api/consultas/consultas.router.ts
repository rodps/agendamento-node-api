/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { auth } from '../../middlewares/authentication.middleware'
import { createConsultasController } from '../../../main/factories/controllers.factory'

const consultasRouter = Router()
const controller = createConsultasController()

consultasRouter.post('/consultas', auth, controller.agendar)

export { consultasRouter }
