import { type NextFunction, type Request, type Response } from 'express'
import { LoginDto } from './dto/login.dto'
import { type AuthService } from '../../../application/services/auth.service'
import { HttpResponse } from '../../helpers/http-response'
import { CadastrarDto } from './dto/cadastrar.dto'

export class AuthController {
  constructor (private readonly authService: AuthService) {}

  public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.authService.login(new LoginDto(req.body))

      HttpResponse(res).send(200, { data: result })
    } catch (err) {
      next(err)
    }
  }

  public register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.authService.cadastrar(new CadastrarDto(req.body))

      HttpResponse(res).send(201, { data: result })
    } catch (err) {
      next(err)
    }
  }
}
