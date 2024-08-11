/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { UsuariosFactory } from '../../factories/usuarios.factory'

const usuariosRouter = Router()

const controller = UsuariosFactory.createUsuariosController()

usuariosRouter.post('/usuarios', controller.cadastrar)

export { usuariosRouter }
