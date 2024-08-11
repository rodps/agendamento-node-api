import { AuthService } from '../../../application/services/auth.service'
import { ConsultaService } from '../../../application/services/consulta.service'
import { MedicoService } from '../../../application/services/medico.service'
import { PacienteService } from '../../../application/services/paciente.service'
import { UsuarioService } from '../../../application/services/usuario.service'
import { createEncryptionService, createJwtService } from '../infrastructure/infra-service.factory'
import { createConsultaRepository, createMedicoRepository, createPacienteRepository, createUsuarioRepository } from '../infrastructure/repository.factory'

export const createAuthService = (): AuthService => {
  return new AuthService(
    createEncryptionService(),
    createUsuarioRepository(),
    createJwtService()
  )
}

export const createConsultaService = (): ConsultaService => {
  return new ConsultaService(
    createConsultaRepository(),
    createMedicoRepository(),
    createPacienteRepository()
  )
}

export const createMedicoService = (): MedicoService => {
  return new MedicoService(createMedicoRepository())
}

export const createPacienteService = (): PacienteService => {
  return new PacienteService(createPacienteRepository())
}

export const createUsuarioService = (): UsuarioService => {
  return new UsuarioService(
    createUsuarioRepository(),
    createEncryptionService()
  )
}
