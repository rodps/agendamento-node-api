import { type NextFunction, type Request, type Response } from 'express'
import { CadastrarPacienteService } from '../../application/services/paciente/cadastrar-paciente.service'
import { type PacienteRepository } from '../../repositories/paciente.repository'
import { z } from 'zod'
import { type IValidator } from '../../application/interfaces/validator.interface'

export class PacientesController {
  constructor (
    private readonly pacienteRepository: PacienteRepository,
    private readonly validator: IValidator
  ) {}

  public cadastrar = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const cadastrarService = new CadastrarPacienteService(this.pacienteRepository, this.validator)

      const data = z.object({
        nome: z.string().min(3),
        telefone: z.string().min(8),
        cpf: z.string().min(11),
        dataNascimento: z.string().date()
      }).parse(req.body)

      cadastrarService
        .execute(data)
        .then(paciente => {
          res.status(201).json(paciente)
        })
        .catch(next)
    } catch (err) {
      next(err)
    }
  }
}
