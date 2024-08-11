import { type IMedicoRepository } from '../../application/interfaces/repository.interface'
import { MedicoService } from '../../application/services/medico.service'
import { MedicoRepository } from '../../infrastructure/repositories/medico.repository'
import { MedicosController } from '../api/medicos/medicos.controller'

export const MedicosFactory = (function () {
  const createMedicosController = (): MedicosController => {
    return new MedicosController(createMedicoService())
  }

  const createMedicoService = (): MedicoService => {
    return new MedicoService(createMedicoRepository())
  }

  const createMedicoRepository = (): IMedicoRepository => {
    return new MedicoRepository()
  }

  return {
    createMedicosController,
    createMedicoService,
    createMedicoRepository
  }
}())
