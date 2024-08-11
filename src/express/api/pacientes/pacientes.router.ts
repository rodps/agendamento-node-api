/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { createPacientesController } from '../../../main/factories/express/controller.factory'

const pacientesRouter = Router()
const controller = createPacientesController()

pacientesRouter.post('/pacientes', controller.cadastrar)

export { pacientesRouter }
