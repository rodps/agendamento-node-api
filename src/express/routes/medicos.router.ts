import { Router } from 'express'
import { MedicosFactory } from '../../main/factories/medicos.factory'
import { toExpressHandler } from '../../main/adapters/express/adapt-controller'

const medicosRouter = Router()
const controller = MedicosFactory.createMedicosController()

medicosRouter
  .post('/medicos', toExpressHandler(controller.cadastrar))

export { medicosRouter }
