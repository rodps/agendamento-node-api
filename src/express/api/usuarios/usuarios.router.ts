/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { createUsuariosController } from '../../../main/factories/express/controller.factory'

const usuariosRouter = Router()
const controller = createUsuariosController()

usuariosRouter.post('/usuarios', controller.cadastrar)

export { usuariosRouter }
