/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { UsuariosFactory } from '../../main/factories/usuarios.factory'
import { toExpressHandler } from '../../main/adapters/express/adapt-controller'

const usuariosRouter = Router()

const controller = UsuariosFactory.createUsuariosController()

usuariosRouter
  .post('/usuarios', toExpressHandler(controller.cadastrar))

export { usuariosRouter }
