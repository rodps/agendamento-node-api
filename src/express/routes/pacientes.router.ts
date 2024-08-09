import { Router } from 'express'
import { PacientesFactory } from '../factories/pacientes.factory'

const pacientesRouter = Router()

const controller = new PacientesFactory().createPacientesController()

pacientesRouter.post('/pacientes', controller.cadastrar)

export { pacientesRouter }
