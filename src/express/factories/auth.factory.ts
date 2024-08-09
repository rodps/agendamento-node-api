import { type IEncryptionService } from '../../application/interfaces/encryption-service.interface'
import { type IJwtService } from '../../application/interfaces/jwt-service.interface'
import { type IUsuarioRepository } from '../../application/interfaces/repository.interface'
import { AuthService } from '../../application/services/auth.service'
import { UsuarioRepository } from '../../infrastructure/repositories/usuario.repository'
import { EncryptionService } from '../../infrastructure/services/encryption.service'
import { JwtService } from '../../infrastructure/services/jwt.service'

export class AuthFactory {
  createAuthService (): AuthService {
    return new AuthService(this.createEncryptionService(), this.createUsuarioRepository(), this.createJwtService())
  }

  createEncryptionService (): IEncryptionService {
    return new EncryptionService()
  }

  createJwtService (): IJwtService {
    return new JwtService()
  }

  createUsuarioRepository (): IUsuarioRepository {
    return new UsuarioRepository()
  }
}
