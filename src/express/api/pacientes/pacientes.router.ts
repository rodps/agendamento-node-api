/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { PacientesFactory } from './pacientes.factory'

const pacientesRouter = Router()

const controller = new PacientesFactory().createPacientesController()

pacientesRouter.post('/pacientes', controller.cadastrar)

export { pacientesRouter }
