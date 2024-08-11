/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { PacientesFactory } from '../../factories/pacientes.factory'

const pacientesRouter = Router()

const controller = PacientesFactory.createPacientesController()

pacientesRouter.post('/pacientes', controller.cadastrar)

export { pacientesRouter }
