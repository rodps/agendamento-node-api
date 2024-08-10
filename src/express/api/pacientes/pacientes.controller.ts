import { type NextFunction, type Request, type Response } from 'express'
import { type PacienteService } from '../../../application/services/paciente.service'
import { CadastrarPacienteDto } from './dto/cadastrar-paciente.dto'

export class PacientesController {
  constructor (
    private readonly pacienteService: PacienteService
  ) {}

  public cadastrar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.pacienteService.cadastrar(new CadastrarPacienteDto(req.body))
      res.status(201).json(result)
    } catch (err) {
      next(err)
    }
  }
}
