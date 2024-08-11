import { type IEncryptionService } from '../../../application/interfaces/encryption-service.interface'
import { type IJwtService } from '../../../application/interfaces/jwt-service.interface'
import { EncryptionService } from '../../../infrastructure/services/encryption.service'
import { JwtService } from '../../../infrastructure/services/jwt.service'

export const createEncryptionService = (): IEncryptionService => {
  return new EncryptionService()
}

export const createJwtService = (): IJwtService => {
  return new JwtService()
}
