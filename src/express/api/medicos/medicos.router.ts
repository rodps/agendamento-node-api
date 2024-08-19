/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { makeMedicosController } from '../../../main/factories/controllers.factory'

const medicosRouter = Router()
const controller = makeMedicosController()

medicosRouter.post('/medicos', controller.cadastrar)

export { medicosRouter }
