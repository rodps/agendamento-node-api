import { type IUsuarioRepository, type IConsultaRepository, type IMedicoRepository, type IPacienteRepository } from '../../application/interfaces/repository.interface'
import { ConsultaRepository } from '../../infrastructure/repositories/consulta.repository'
import { MedicoRepository } from '../../infrastructure/repositories/medico.repository'
import { PacienteRepository } from '../../infrastructure/repositories/paciente.repository'
import { UsuarioRepository } from '../../infrastructure/repositories/usuario.repository'

export const createConsultaRepository = (): IConsultaRepository => {
  return new ConsultaRepository()
}

export const createMedicoRepository = (): IMedicoRepository => {
  return new MedicoRepository()
}

export const createPacienteRepository = (): IPacienteRepository => {
  return new PacienteRepository()
}

export const createUsuarioRepository = (): IUsuarioRepository => {
  return new UsuarioRepository()
}
