import { type NextFunction, type Request, type Response } from 'express'
import { type AuthService } from '../../../application/services/auth.service'
import { LoginDto } from './dto/login.dto'

export class AuthController {
  constructor (
    private readonly authService: AuthService
  ) {}

  public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.authService.login(new LoginDto(req.body))
      res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }
}
