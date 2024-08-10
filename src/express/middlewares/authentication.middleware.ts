import { type NextFunction, type Request, type Response } from 'express'
import { ApplicationError } from '../../application/errors/application.error'
import { AuthFactory } from '../api/auth/auth.factory'

export const auth = (req: Request, res: Response, next: NextFunction): void => {
  if (req.headers.authorization == null) {
    throw new ApplicationError('Unauthorized', 401)
  }

  const token = getBearerToken(req.headers.authorization)

  if (token == null || token.length === 0) {
    throw new ApplicationError('Unauthorized', 401)
  }

  const jwtService = new AuthFactory().createJwtService()
  const payload = jwtService.decodeToken(token)

  req.user = {
    id: payload.sub,
    role: payload.role,
    nome: payload.nome
  }

  next()
}

const getBearerToken = (authorization: string | undefined): string => {
  if (authorization == null) {
    throw new ApplicationError('Authorization not found', 401)
  }

  const [type, token] = authorization.split(' ')

  if (type !== 'Bearer') {
    throw new ApplicationError('Authorization not found', 401)
  }

  return token
}
