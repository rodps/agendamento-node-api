/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { MedicosFactory } from './medicos.factory'

const medicosRouter = Router()
const controller = new MedicosFactory().createMedicosController()

medicosRouter.post('/medicos', controller.cadastrar)

export { medicosRouter }
