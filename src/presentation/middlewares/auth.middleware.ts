import { type JwtService } from '../../infrastructure/services/jwt.service'
import { HttpResponses } from '../helpers/http-responses'
import { type HttpResponse, type HttpRequest } from '../interfaces/http'
import { type IMiddleware } from '../interfaces/middleware'

export class AuthMiddleware implements IMiddleware {
  constructor (
    private readonly jwtService: JwtService
  ) {}

  public handle = async (req: HttpRequest): Promise<HttpResponse> => {
    if (req.headers.authorization == null) {
      return HttpResponses.unauthorized()
    }

    const token = this.getBearerToken(req.headers.authorization as string)

    if (token == null || token.length === 0) {
      return HttpResponses.unauthorized()
    }

    const payload = this.jwtService.decodeToken(token)

    return HttpResponses.ok(payload)
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
