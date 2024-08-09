import { Router } from 'express'
import { UsuariosFactory } from '../factories/usuarios.factory'

const usuariosRouter = Router()

const controller = new UsuariosFactory().createUsuariosController()

usuariosRouter.post('/usuarios', controller.cadastrar)

export { usuariosRouter }
