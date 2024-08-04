import { Router } from 'express'
import { UsuarioService } from '../../application/services/usuario.service'
import { UsuariosController } from '../controllers/usuarios.controller'
import { UsuarioRepository } from '../../infrastructure/repositories/usuario.repository'
import { EncryptionService } from '../../infrastructure/services/encryption.service'

const usuariosRouter = Router()

const usuarioService = new UsuarioService(
  new UsuarioRepository(),
  new EncryptionService()
)
const controller = new UsuariosController(usuarioService)

usuariosRouter.post('/usuarios', controller.cadastrar)

export { usuariosRouter }
