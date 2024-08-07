import { Router } from 'express'
import { MedicosFactory } from '../factories/medicos.factory'

const medicosRouter = Router()
const controller = new MedicosFactory().createMedicosController()

medicosRouter.post('/medicos', controller.cadastrar)

export { medicosRouter }
