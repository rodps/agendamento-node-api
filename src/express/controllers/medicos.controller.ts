import { type NextFunction, type Request, type Response } from 'express'
import { CadastrarMedicoService } from '../../application/services/medico/cadastrar/cadastrar-medico.service'
import { type MedicoRepository } from '../../repositories/medico.repository'
import { z } from 'zod'

export class MedicosController {
  constructor (
    private readonly medicoRepository: MedicoRepository
  ) {}

  public cadastrar = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const cadastrarService = new CadastrarMedicoService(this.medicoRepository)

      const data = z.object({
        nome: z.string().min(3),
        crm: z.string().min(6),
        especialidade: z.string().min(3)
      }).parse(req.body)

      cadastrarService
        .execute(data)
        .then(medico => {
          res.status(201).json(medico)
        }).catch(next)
    } catch (err) {
      next(err)
    }
  }
}
