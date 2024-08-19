/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { makeConsultasController } from '../../../main/factories/controllers.factory'
import { makeAuthMiddleware } from '../../../main/factories/middlewares.factory'

const consultasRouter = Router()
const controller = makeConsultasController()
const { handle: auth } = makeAuthMiddleware()

consultasRouter.post('/consultas', auth, controller.agendar)

export { consultasRouter }
