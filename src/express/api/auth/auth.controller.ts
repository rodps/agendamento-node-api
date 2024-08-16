import { type NextFunction, type Request, type Response } from 'express'
import { LoginDtoRequest } from './dto/login.dto'
import { type AuthService } from '../../../application/services/auth.service'
import { HttpResponse } from '../../helpers/http-response'
import { CadastrarDtoRequest } from './dto/cadastrar.dto'

export class AuthController {
  constructor (private readonly authService: AuthService) {}

  public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const token = await this.authService.login(new LoginDtoRequest(req.body))

      HttpResponse(res).send(200, { data: token })
    } catch (err) {
      next(err)
    }
  }

  public cadastrar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await this.authService.cadastrar(
        new CadastrarDtoRequest(req.body)
      )

      HttpResponse(res).send(201, { data: user })
    } catch (err) {
      next(err)
    }
  }
}
