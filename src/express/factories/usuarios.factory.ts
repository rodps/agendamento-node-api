import { type IEncryptionService } from '../../application/interfaces/encryption-service.interface'
import { type IUsuarioRepository } from '../../application/interfaces/repository.interface'
import { UsuarioService } from '../../application/services/usuario.service'
import { UsuarioRepository } from '../../infrastructure/repositories/usuario.repository'
import { EncryptionService } from '../../infrastructure/services/encryption.service'
import { UsuariosController } from '../controllers/usuarios.controller'

export class UsuariosFactory {
  createUsuariosController (): UsuariosController {
    return new UsuariosController(this.createUsuarioService())
  }

  createUsuarioService (): UsuarioService {
    return new UsuarioService(this.createUsuarioRepository(), this.createEncryptionService())
  }

  createUsuarioRepository (): IUsuarioRepository {
    return new UsuarioRepository()
  }

  createEncryptionService (): IEncryptionService {
    return new EncryptionService()
  }
}
