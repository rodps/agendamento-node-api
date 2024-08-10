import { type NextFunction, type Request, type Response } from 'express'
import { type MedicoService } from '../../../application/services/medico.service'
import { CadastrarMedicoDto } from './dto/cadastrar-medico.dto'

export class MedicosController {
  constructor (
    private readonly medicoService: MedicoService
  ) {}

  public cadastrar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.medicoService.cadastrar(new CadastrarMedicoDto(req.body))
      res.status(201).json(result)
    } catch (err) {
      next(err)
    }
  }
}
