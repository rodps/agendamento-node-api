import { type NextFunction, type Request, type Response } from 'express'
import { TokenNotFoundError } from '../errors/token-not-found.error'
import { type AuthService } from '../../application/services/auth.service'

export class AuthMiddleware {
  constructor (private readonly authService: AuthService) {}

  public handle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const token = this.getBearerToken(req.headers.authorization)
      if (token === null || token.length === 0) {
        throw new TokenNotFoundError()
      }

      const payload = await this.authService.validateToken(token)
      req.user = {
        id: payload.sub,
        nome: payload.nome,
        role: payload.role
      }
      next()
    } catch (err) {
      next(err)
    }
  }

  private getBearerToken (authorization: string | undefined): string | null {
    if (authorization == null) {
      return null
    }

    const [type, token] = authorization.split(' ')

    if (type !== 'Bearer') {
      return null
    }

    return token
  }
}
