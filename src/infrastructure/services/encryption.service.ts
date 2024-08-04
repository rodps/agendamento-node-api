import { type IEncryptionService } from '../../application/interfaces/encryption-service.interface'
import bcrypt from 'bcrypt'

export class EncryptionService implements IEncryptionService {
  hash (value: string): string {
    return bcrypt.hashSync(value, 10)
  }

  compare (value: string, hash: string): boolean {
    return bcrypt.compareSync(value, hash)
  }
}
