/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { MedicosFactory } from '../../factories/medicos.factory'

const medicosRouter = Router()
const controller = MedicosFactory.createMedicosController()

medicosRouter.post('/medicos', controller.cadastrar)

export { medicosRouter }
