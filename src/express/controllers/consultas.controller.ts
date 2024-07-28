import { type NextFunction, type Request, type Response } from 'express'
import { AgendarConsultaService } from '../../application/services/consulta/agendar/agendar-consulta.service'
import { ConsultaRepository } from '../../repositories/consulta.repository'
import { MedicoRepository } from '../../repositories/medico.repository'
import { PacienteRepository } from '../../repositories/paciente.repository'
import { z } from 'zod'

const consultasController = {
  agendar: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const consultaRepository = new ConsultaRepository()
      const medicoRepository = new MedicoRepository()
      const pacienteRepository = new PacienteRepository()
      const agendarService = new AgendarConsultaService(consultaRepository, medicoRepository, pacienteRepository)

      const data = z.object({
        medicoId: z.number().positive(),
        pacienteId: z.number().positive(),
        dataInicio: z.string().datetime().pipe(z.coerce.date()),
        dataFim: z.string().datetime().pipe(z.coerce.date())
      }).parse(req.body)

      const result = await agendarService.execute(data)
      res.status(201).json(result)
    } catch (err) {
      next(err)
    }
  }
}

export { consultasController }
