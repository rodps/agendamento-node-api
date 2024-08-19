import { AuthService } from '../../application/services/auth.service'
import { ConsultaService } from '../../application/services/consulta.service'
import { MedicoService } from '../../application/services/medico.service'
import { PacienteService } from '../../application/services/paciente.service'
import { makeEncryptionService, makeJwtService } from './infrastructure-services.factory'
import { makeConsultaRepository, makeMedicoRepository, makePacienteRepository, makeUsuarioRepository } from './repositories.factory'

export const makeAuthService = (): AuthService => {
  return new AuthService(
    makeEncryptionService(),
    makeUsuarioRepository(),
    makeJwtService()
  )
}

export const makeConsultaService = (): ConsultaService => {
  return new ConsultaService(
    makeConsultaRepository(),
    makeMedicoRepository(),
    makePacienteRepository()
  )
}

export const makeMedicoService = (): MedicoService => {
  return new MedicoService(makeMedicoRepository())
}

export const makePacienteService = (): PacienteService => {
  return new PacienteService(makePacienteRepository())
}
