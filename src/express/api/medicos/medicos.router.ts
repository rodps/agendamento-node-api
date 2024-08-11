/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { createMedicosController } from '../../../main/factories/express/controller.factory'

const medicosRouter = Router()
const controller = createMedicosController()

medicosRouter.post('/medicos', controller.cadastrar)

export { medicosRouter }
