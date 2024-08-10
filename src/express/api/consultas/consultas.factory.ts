import { type IPacienteRepository, type IConsultaRepository, type IMedicoRepository } from '../../../application/interfaces/repository.interface'
import { ConsultaService } from '../../../application/services/consulta.service'
import { ConsultaRepository } from '../../../infrastructure/repositories/consulta.repository'
import { MedicoRepository } from '../../../infrastructure/repositories/medico.repository'
import { PacienteRepository } from '../../../infrastructure/repositories/paciente.repository'
import { ConsultasController } from './consultas.controller'

export class ConsultasFactory {
  createConsultaRepository (): IConsultaRepository {
    return new ConsultaRepository()
  }

  createMedicoRepository (): IMedicoRepository {
    return new MedicoRepository()
  }

  createPacienteRepository (): IPacienteRepository {
    return new PacienteRepository()
  }

  createConsultasService (): ConsultaService {
    return new ConsultaService(
      this.createConsultaRepository(),
      this.createMedicoRepository(),
      this.createPacienteRepository()
    )
  }

  createConsultasController (): ConsultasController {
    return new ConsultasController(this.createConsultasService())
  }
}
