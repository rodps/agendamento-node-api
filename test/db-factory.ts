import { faker } from '@faker-js/faker'
import { UserRole, Usuario } from '../src/application/entity/usuario.entity'
import { makeConsultaRepository, makeMedicoRepository, makePacienteRepository, makeUsuarioRepository } from '../src/main/factories/repositories.factory'
import { Paciente } from '../src/application/entity/paciente.entity'
import { Medico } from '../src/application/entity/medico.entity'
import { Consulta, ConsultaStatus } from '../src/application/entity/consulta.entity'

export const createUsuario = async (): Promise<Usuario> => {
  const usuarioRepository = makeUsuarioRepository()

  return await usuarioRepository.insert(
    new Usuario(
      null,
      faker.internet.userName(),
      faker.internet.password(),
      faker.internet.email(),
      UserRole.ADMIN
    )
  )
}

export const createPaciente = async (): Promise<Paciente> => {
  const pacienteRepository = makePacienteRepository()

  return await pacienteRepository.insert(
    new Paciente(
      null,
      faker.person.fullName(),
      faker.string.sample(),
      faker.string.sample(),
      faker.date.birthdate().toISOString().substring(0, 10)
    )
  )
}

export const createMedico = async (): Promise<Medico> => {
  const medicoRepository = makeMedicoRepository()

  return await medicoRepository.insert(
    new Medico(
      null,
      faker.person.fullName(),
      faker.string.sample(),
      faker.string.sample()
    )
  )
}

export const createConsulta = async (medico: Medico, paciente: Paciente): Promise<Consulta> => {
  const consultaRepository = makeConsultaRepository()
  const dataInicio = faker.date.future()
  const dataFim = new Date(dataInicio.getTime() + (60 * 60 * 1000))

  return await consultaRepository.insert(
    new Consulta(
      null,
      dataInicio,
      dataFim,
      medico.getId(),
      paciente.getId(),
      ConsultaStatus.Pendente
    )
  )
}
