import { type IUsuarioRepository, type IConsultaRepository, type IMedicoRepository, type IPacienteRepository } from '../../application/interfaces/repository.interface'
import { ConsultaRepository } from '../../infrastructure/repositories/consulta.repository'
import { MedicoRepository } from '../../infrastructure/repositories/medico.repository'
import { PacienteRepository } from '../../infrastructure/repositories/paciente.repository'
import { UsuarioRepository } from '../../infrastructure/repositories/usuario.repository'

export const makeConsultaRepository = (): IConsultaRepository => {
  return new ConsultaRepository()
}

export const makeMedicoRepository = (): IMedicoRepository => {
  return new MedicoRepository()
}

export const makePacienteRepository = (): IPacienteRepository => {
  return new PacienteRepository()
}

export const makeUsuarioRepository = (): IUsuarioRepository => {
  return new UsuarioRepository()
}
