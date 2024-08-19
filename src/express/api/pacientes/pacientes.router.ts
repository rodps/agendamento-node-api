/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { makePacientesController } from '../../../main/factories/controllers.factory'

const pacientesRouter = Router()
const controller = makePacientesController()

pacientesRouter.post('/pacientes', controller.cadastrar)

export { pacientesRouter }
