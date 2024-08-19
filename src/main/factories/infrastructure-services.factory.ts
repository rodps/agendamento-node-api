import { type IEncryptionService } from '../../application/interfaces/encryption-service.interface'
import { type IJwtService } from '../../application/interfaces/jwt-service.interface'
import { EncryptionService } from '../../infrastructure/services/encryption.service'
import { JwtService } from '../../infrastructure/services/jwt.service'

export const makeEncryptionService = (): IEncryptionService => {
  return new EncryptionService()
}

export const makeJwtService = (): IJwtService => {
  return new JwtService()
}
