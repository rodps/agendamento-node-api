import { type IMedicoRepository } from '../../../application/interfaces/repository.interface'
import { MedicoService } from '../../../application/services/medico.service'
import { MedicoRepository } from '../../../infrastructure/repositories/medico.repository'
import { MedicosController } from './medicos.controller'

export class MedicosFactory {
  createMedicosController (): MedicosController {
    return new MedicosController(this.createMedicoService())
  }

  createMedicoService (): MedicoService {
    return new MedicoService(this.createMedicoRepository())
  }

  createMedicoRepository (): IMedicoRepository {
    return new MedicoRepository()
  }
}
