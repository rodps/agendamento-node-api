import { type NextFunction, type Request, type Response } from 'express'
import { AgendarConsultaService } from '../../application/services/consulta/agendar/agendar-consulta.service'
import { type ConsultaRepository } from '../../repositories/consulta.repository'
import { type MedicoRepository } from '../../repositories/medico.repository'
import { type PacienteRepository } from '../../repositories/paciente.repository'
import { z } from 'zod'

export class ConsultasController {
  constructor (
    private readonly consultaRepository: ConsultaRepository,
    private readonly medicoRepository: MedicoRepository,
    private readonly pacienteRepository: PacienteRepository
  ) {}

  public agendar = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const agendarService = new AgendarConsultaService(
        this.consultaRepository,
        this.medicoRepository,
        this.pacienteRepository
      )

      const data = z.object({
        medicoId: z.number().positive(),
        pacienteId: z.number().positive(),
        dataInicio: z.string().datetime().pipe(z.coerce.date()),
        dataFim: z.string().datetime().pipe(z.coerce.date())
      }).parse(req.body)

      agendarService
        .execute(data)
        .then(result => { res.status(201).json(result) })
        .catch(next)
    } catch (err) {
      next(err)
    }
  }
}
