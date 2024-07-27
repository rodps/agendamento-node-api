import { type NextFunction, type Request, type Response } from 'express'
import { AgendarConsultaService } from '../../application/domain/consulta/agendar/agendar-consulta.service'
import { AgendarConsultaDto } from '../../application/domain/consulta/agendar/dto/agendar-consulta.dto'
import { ConsultaRepository } from '../../repositories/consulta.repository'
import { MedicoRepository } from '../../repositories/medico.repository'
import { PacienteRepository } from '../../repositories/paciente.repository'

const consultasController = {
  agendar: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const consultaRepository = new ConsultaRepository()
      const medicoRepository = new MedicoRepository()
      const pacienteRepository = new PacienteRepository()
      const agendarService = new AgendarConsultaService(consultaRepository, medicoRepository, pacienteRepository)

      const result = await agendarService.execute(new AgendarConsultaDto(req.body))
      res.status(201).json(result)
    } catch (err) {
      next(err)
    }
  }
}

export { consultasController }
