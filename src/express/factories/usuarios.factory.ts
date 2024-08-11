import { type IEncryptionService } from '../../application/interfaces/encryption-service.interface'
import { type IUsuarioRepository } from '../../application/interfaces/repository.interface'
import { UsuarioService } from '../../application/services/usuario.service'
import { UsuarioRepository } from '../../infrastructure/repositories/usuario.repository'
import { EncryptionService } from '../../infrastructure/services/encryption.service'
import { UsuariosController } from '../api/usuarios/usuarios.controller'

export const UsuariosFactory = (function () {
  const createUsuariosController = (): UsuariosController => {
    return new UsuariosController(createUsuarioService())
  }

  const createUsuarioService = (): UsuarioService => {
    return new UsuarioService(createUsuarioRepository(), createEncryptionService())
  }

  const createUsuarioRepository = (): IUsuarioRepository => {
    return new UsuarioRepository()
  }

  const createEncryptionService = (): IEncryptionService => {
    return new EncryptionService()
  }

  return {
    createUsuariosController,
    createUsuarioService,
    createUsuarioRepository,
    createEncryptionService
  }
}())
