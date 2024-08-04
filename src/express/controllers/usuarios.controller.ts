import { type NextFunction, type Request, type Response } from 'express'
import { type UsuarioService } from '../../application/services/usuario.service'
import { z } from 'zod'

export class UsuariosController {
  constructor (
    private readonly usuarioService: UsuarioService
  ) {}

  public cadastrar = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const data = z.object({
        nome: z.string().min(3),
        email: z.string().email(),
        password: z.string().min(8)
      }).parse(req.body)

      this.usuarioService
        .cadastrar(data)
        .then(result => {
          res.status(201).json(result)
        })
        .catch(next)
    } catch (err) {
      next(err)
    }
  }
}
