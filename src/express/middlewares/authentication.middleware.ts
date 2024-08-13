import { type NextFunction, type Request, type Response } from 'express'
import { createAuthService } from '../../main/factories/application-services.factory'
import { TokenNotFoundError } from '../errors/token-not-found.error'

export const auth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = getBearerToken(req.headers.authorization)
    if (token === null || token.length === 0) {
      throw new TokenNotFoundError()
    }

    const authService = createAuthService()
    const payload = await authService.validateToken(token)
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

const getBearerToken = (authorization: string | undefined): string | null => {
  if (authorization == null) {
    return null
  }

  const [type, token] = authorization.split(' ')

  if (type !== 'Bearer') {
    return null
  }

  return token
}
