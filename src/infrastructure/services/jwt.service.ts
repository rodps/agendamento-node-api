import jwt from 'jsonwebtoken'
import { type IJwtPayload } from '../types'
import { type Usuario } from '../../application/entity/usuario.entity'
import { ApplicationError } from '../../application/errors/application.error'
import { appConfig } from '../../app-config'

export class JwtService {
  public generateToken (user: Usuario): string {
    return jwt.sign({
      sub: user.id,
      nome: user.nome,
      role: user.role
    }, appConfig.jwtSecret, { expiresIn: '1h' })
  }

  public decodeToken (token: string): IJwtPayload {
    try {
      return jwt.verify(token, appConfig.jwtSecret) as unknown as IJwtPayload
    } catch (error) {
      throw new ApplicationError('Invalid token', 401)
    }
  }
}
