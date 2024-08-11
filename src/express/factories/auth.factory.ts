import { type IEncryptionService } from '../../application/interfaces/encryption-service.interface'
import { type IJwtService } from '../../application/interfaces/jwt-service.interface'
import { type IUsuarioRepository } from '../../application/interfaces/repository.interface'
import { AuthService } from '../../application/services/auth.service'
import { UsuarioRepository } from '../../infrastructure/repositories/usuario.repository'
import { EncryptionService } from '../../infrastructure/services/encryption.service'
import { JwtService } from '../../infrastructure/services/jwt.service'
import { AuthController } from '../api/auth/auth.controller'

export const AuthFactory = (function () {
  const createEncryptionService = (): IEncryptionService => {
    return new EncryptionService()
  }

  const createUsuarioRepository = (): IUsuarioRepository => {
    return new UsuarioRepository()
  }

  const createJwtService = (): IJwtService => {
    return new JwtService()
  }

  const createAuthService = (): AuthService => {
    return new AuthService(
      createEncryptionService(),
      createUsuarioRepository(),
      createJwtService()
    )
  }

  const createAuthController = (): AuthController => {
    return new AuthController(createAuthService())
  }

  return {
    createAuthService,
    createEncryptionService,
    createJwtService,
    createUsuarioRepository,
    createAuthController
  }
}())
