import { type IPacienteRepository, type IConsultaRepository, type IMedicoRepository } from '../../application/interfaces/repository.interface'
import { ConsultaService } from '../../application/services/consulta.service'
import { ConsultaRepository } from '../../infrastructure/repositories/consulta.repository'
import { MedicoRepository } from '../../infrastructure/repositories/medico.repository'
import { PacienteRepository } from '../../infrastructure/repositories/paciente.repository'
import { ConsultasController } from '../../presentation/controllers/consultas.controller'

export const ConsultasFactory = (function () {
  const createConsultaRepository = (): IConsultaRepository => {
    return new ConsultaRepository()
  }

  const createMedicoRepository = (): IMedicoRepository => {
    return new MedicoRepository()
  }

  const createPacienteRepository = (): IPacienteRepository => {
    return new PacienteRepository()
  }

  const createConsultasService = (): ConsultaService => {
    return new ConsultaService(
      createConsultaRepository(),
      createMedicoRepository(),
      createPacienteRepository()
    )
  }

  const createConsultasController = (): ConsultasController => {
    return new ConsultasController(createConsultasService())
  }

  return {
    createConsultasController,
    createConsultasService,
    createPacienteRepository,
    createMedicoRepository,
    createConsultaRepository
  }
}())
