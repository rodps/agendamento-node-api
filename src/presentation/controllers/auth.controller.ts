import { type AuthService } from '../../application/services/auth.service'
import { LoginDto } from '../dto/auth/login.dto'
import { handleError } from '../helpers/error-handler'
import { HttpResponses } from '../helpers/http-responses'
import { type HttpResponse, type HttpRequest } from '../interfaces/http'

export class AuthController {
  constructor (private readonly authService: AuthService) {}

  public login = async (request: HttpRequest): Promise<HttpResponse> => {
    try {
      const result = await this.authService.login(new LoginDto(request.body))
      return HttpResponses.ok(result)
    } catch (err) {
      return handleError(err)
    }
  }
}
