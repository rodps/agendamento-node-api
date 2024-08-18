import { faker } from '@faker-js/faker'
import { UserRole, Usuario } from '../src/application/entity/usuario.entity'
import { createConsultaRepository, createMedicoRepository, createPacienteRepository, createUsuarioRepository } from '../src/main/factories/repositories.factory'
import { Paciente } from '../src/application/entity/paciente.entity'
import { Medico } from '../src/application/entity/medico.entity'
import { Consulta, ConsultaStatus } from '../src/application/entity/consulta.entity'

export const DBFactory = (function () {
  return {
    createUsuario: async (): Promise<Usuario> => {
      const usuarioRepository = createUsuarioRepository()

      return await usuarioRepository.insert(
        new Usuario(
          null,
          faker.internet.userName(),
          faker.internet.password(),
          faker.internet.email(),
          UserRole.ADMIN
        )
      )
    },
    createPaciente: async (): Promise<Paciente> => {
      const pacienteRepository = createPacienteRepository()

      return await pacienteRepository.insert(
        new Paciente(
          null,
          faker.person.fullName(),
          faker.string.sample(),
          faker.string.sample(),
          faker.date.birthdate().toISOString().substring(0, 10)
        )
      )
    },
    createMedico: async (): Promise<Medico> => {
      const medicoRepository = createMedicoRepository()

      return await medicoRepository.insert(
        new Medico(
          null,
          faker.person.fullName(),
          faker.string.sample(),
          faker.string.sample()
        )
      )
    },
    createConsulta: async (medico: Medico, paciente: Paciente): Promise<Consulta> => {
      const consultaRepository = createConsultaRepository()
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
  }
}())
