import { type NextFunction, type Request, type Response } from 'express'
import { type UsuarioService } from '../../../application/services/usuario.service'
import { CadastrarUsuarioDto } from './dto/cadastrar-usuario.dto'

export class UsuariosController {
  constructor (private readonly usuarioService: UsuarioService) {}

  public cadastrar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.usuarioService.cadastrar(new CadastrarUsuarioDto(req.body))
      res.status(201).json(result)
    } catch (err) {
      next(err)
    }
  }
}
