import { z } from 'zod'
import { type NextFunction, type Request, type Response } from 'express'
import { type MedicoService } from '../../application/services/medico.service'

export class MedicosController {
  constructor (
    private readonly medicoService: MedicoService
  ) {}

  public cadastrar = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const data = z.object({
        nome: z.string().min(3),
        crm: z.string().min(6),
        especialidade: z.string().min(3)
      }).parse(req.body)

      this.medicoService
        .cadastrar(data)
        .then(medico => {
          res.status(201).json(medico)
        }).catch(next)
    } catch (err) {
      next(err)
    }
  }
}
