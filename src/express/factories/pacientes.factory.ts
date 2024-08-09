import { type IPacienteRepository } from '../../application/interfaces/repository.interface'
import { PacienteService } from '../../application/services/paciente.service'
import { PacienteRepository } from '../../infrastructure/repositories/paciente.repository'
import { PacientesController } from '../controllers/pacientes.controller'

export class PacientesFactory {
  createPacienteRepository (): IPacienteRepository {
    return new PacienteRepository()
  }

  createPacientesController (): PacientesController {
    return new PacientesController(this.createPacienteService())
  }

  createPacienteService (): PacienteService {
    return new PacienteService(this.createPacienteRepository())
  }
}
