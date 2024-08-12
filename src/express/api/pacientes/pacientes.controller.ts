import { type NextFunction, type Request, type Response } from 'express'
import { type PacienteService } from '../../../application/services/paciente.service'
import { CadastrarPacienteDto } from './dto/cadastrar-paciente.dto'
import { HttpResponse } from '../../helpers/http-response'

export class PacientesController {
  constructor (private readonly pacienteService: PacienteService) {}

  public cadastrar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.pacienteService.cadastrar(new CadastrarPacienteDto(req.body))

      const { statusCode, body } = HttpResponse.created(result)
      res.status(statusCode).json(body)
    } catch (err) {
      next(err)
    }
  }
}
