import { type NextFunction, type Request, type Response } from 'express'
import { createAuthService } from '../../main/factories/application-services.factory'
import { HttpResponse } from '../helpers/http-response'

export const auth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = getBearerToken(req.headers.authorization)

  const { statusCode, body } = HttpResponse.unauthorized()

  if (token === null || token.length === 0) {
    res.status(statusCode).json(body)
    return
  }

  const authService = createAuthService()

  try {
    const payload = await authService.validateToken(token)
    req.user = {
      id: payload.sub,
      nome: payload.nome,
      role: payload.role
    }
  } catch (error) {
    res.status(statusCode).json(body)
    return
  }

  next()
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
