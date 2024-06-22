import { type Request, type Response } from 'express'
import { AgendarConsultaService } from '../../../application/domain/consulta/agendar/agendar-consulta.service'
import { AgendarConsultaDto } from '../../../application/domain/consulta/agendar/dto/agendar-consulta.dto'
import { ConsultaRepository } from '../../../repositories/consulta.repository'
import { BaseController } from '../base.controller'
import { MedicoRepository } from '../../../repositories/medico.repository'
import { PacienteRepository } from '../../../repositories/paciente.repository'

export class AgendarConsultaController extends BaseController {
  async _execute (req: Request, res: Response): Promise<void> {
    const consultaRepository = new ConsultaRepository()
    const medicoRepository = new MedicoRepository()
    const pacienteRepository = new PacienteRepository()
    const agendarService = new AgendarConsultaService(consultaRepository, medicoRepository, pacienteRepository)

    const result = await agendarService.execute(new AgendarConsultaDto(req.body))
    res.status(201).json(result)
  }
}
