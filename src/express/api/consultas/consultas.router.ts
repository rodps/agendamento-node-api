/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { createConsultasController } from '../../../main/factories/controllers.factory'
import { createAuthMiddleware } from '../../../main/factories/middlewares.factory'

const consultasRouter = Router()
const controller = createConsultasController()
const { handle: auth } = createAuthMiddleware()

consultasRouter.post('/consultas', auth, controller.agendar)

export { consultasRouter }
