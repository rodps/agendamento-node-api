import { z } from 'zod'
import { type NextFunction, type Request, type Response } from 'express'
import { type ConsultaService } from '../../application/services/consulta.service'

export class ConsultasController {
  constructor (
    private readonly consultaService: ConsultaService
  ) {}

  public agendar = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const data = z.object({
        medicoId: z.number().positive(),
        pacienteId: z.number().positive(),
        dataInicio: z.string().datetime().pipe(z.coerce.date()),
        dataFim: z.string().datetime().pipe(z.coerce.date())
      }).parse(req.body)

      this.consultaService
        .agendar(data)
        .then(result => { res.status(201).json(result) })
        .catch(next)
    } catch (err) {
      next(err)
    }
  }
}
