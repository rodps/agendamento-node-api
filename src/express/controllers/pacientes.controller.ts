import { z } from 'zod'
import { type NextFunction, type Request, type Response } from 'express'
import { type PacienteService } from '../../application/services/paciente.service'

export class PacientesController {
  constructor (
    private readonly pacienteService: PacienteService
  ) {}

  public cadastrar = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const data = z.object({
        nome: z.string().min(3),
        telefone: z.string().min(8),
        cpf: z.string().min(11),
        dataNascimento: z.string().date()
      }).parse(req.body)

      this.pacienteService
        .cadastrar(data)
        .then(paciente => {
          res.status(201).json(paciente)
        })
        .catch(next)
    } catch (err) {
      next(err)
    }
  }
}
