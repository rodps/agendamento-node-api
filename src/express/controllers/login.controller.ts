import { type NextFunction, type Request, type Response } from 'express'
import { type AuthService } from '../../application/services/auth.service'
import { z } from 'zod'

export class LoginController {
  constructor (
    private readonly authService: AuthService
  ) {}

  public login = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const { email, password } = z.object({
        email: z.string(),
        password: z.string()
      }).parse(req.body)

      this.authService
        .login(email, password)
        .then(token => {
          res.status(200).json({ token })
        })
        .catch(next)
    } catch (err) {
      next(err)
    }
  }
}
