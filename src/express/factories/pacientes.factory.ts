import { type IPacienteRepository } from '../../application/interfaces/repository.interface'
import { PacienteService } from '../../application/services/paciente.service'
import { PacienteRepository } from '../../infrastructure/repositories/paciente.repository'
import { PacientesController } from '../api/pacientes/pacientes.controller'

export const PacientesFactory = (function () {
  const createPacienteRepository = (): IPacienteRepository => {
    return new PacienteRepository()
  }

  const createPacientesController = (): PacientesController => {
    return new PacientesController(createPacienteService())
  }

  const createPacienteService = (): PacienteService => {
    return new PacienteService(createPacienteRepository())
  }

  return {
    createPacienteRepository,
    createPacientesController,
    createPacienteService
  }
}())
