/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { PacientesFactory } from '../../main/factories/pacientes.factory'
import { toExpressHandler } from '../../main/adapters/express/adapt-controller'

const pacientesRouter = Router()

const controller = PacientesFactory.createPacientesController()

pacientesRouter
  .post('/pacientes', toExpressHandler(controller.cadastrar))

export { pacientesRouter }
