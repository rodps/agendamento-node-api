/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { UsuariosFactory } from './usuarios.factory'

const usuariosRouter = Router()

const controller = new UsuariosFactory().createUsuariosController()

usuariosRouter.post('/usuarios', controller.cadastrar)

export { usuariosRouter }
