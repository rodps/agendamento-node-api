import { mock } from 'jest-mock-extended'
import { type IConsultaRepository, type IMedicoRepository, type IPacienteRepository } from '../../../../src/application/interfaces/repository.interface'
import { Consulta, ConsultaStatus } from '../../../../src/application/entity/consulta.entity'
import { Medico } from '../../../../src/application/entity/medico.entity'
import { Paciente } from '../../../../src/application/entity/paciente.entity'
import { ConsultaService } from '../../../../src/application/services/consulta.service'
import { type ConsultaDto } from '../../../../src/application/dto/consulta/consulta.dto'
import { ApplicationError } from '../../../../src/application/errors/application.error'

describe('Consulta Service: agendar', () => {
  const consultaRepository = mock<IConsultaRepository>()
  const medicoRepository = mock<IMedicoRepository>()
  const pacienteRepository = mock<IPacienteRepository>()

  const sut = new ConsultaService(consultaRepository, medicoRepository, pacienteRepository)

  beforeAll(() => {
    consultaRepository.buscarPorData.mockResolvedValue([])
    consultaRepository.insert.mockResolvedValue(
      new Consulta(
        1,
        new Date('2022-01-01 00:00:00'),
        new Date('2022-01-01 01:00:00'),
        1,
        1,
        ConsultaStatus.Pendente
      )
    )

    medicoRepository.buscarPorId.mockResolvedValue(
      new Medico(1, 'crm', 'especialidade', 'nome')
    )

    pacienteRepository.buscarPorId.mockResolvedValue(
      new Paciente(1, 'cpf', 'nome', '12345678910', '2022-01-01')
    )
  })

  test('deve chamar o repository corretamente', async () => {
    // arrange
    const data: ConsultaDto = {
      dataInicio: new Date('2022-01-01 00:00:00'),
      dataFim: new Date('2022-01-01 01:00:00'),
      medicoId: 1,
      pacienteId: 1
    }

    // act
    await sut.agendar(data)

    // assert
    expect(consultaRepository.insert).toHaveBeenCalledTimes(1)
    expect(consultaRepository.insert).toHaveBeenCalledWith(
      new Consulta(
        null,
        data.dataInicio,
        data.dataFim,
        data.medicoId,
        data.pacienteId,
        ConsultaStatus.Pendente
      )
    )
  })

  test('deve retornar um erro quando o horário estiver indisponível', async () => {
    // arrange
    const data: ConsultaDto = {
      dataInicio: new Date('2022-01-01 00:00:00'),
      dataFim: new Date('2022-01-01 01:00:00'),
      medicoId: 1,
      pacienteId: 1
    }
    jest
      .spyOn(consultaRepository, 'buscarPorData')
      .mockResolvedValueOnce([
        new Consulta(
          1,
          data.dataInicio,
          data.dataFim,
          data.medicoId,
          data.pacienteId,
          ConsultaStatus.Pendente
        )
      ])

    // act & assert
    try {
      await sut.agendar(data)
      fail()
    } catch (error) {
      expect(error).toBeInstanceOf(ApplicationError)
      expect(error).toHaveProperty('message', 'Horário indisponível')
    }
  })

  test('deve retornar uma consulta', async () => {
    // arrange
    const data: ConsultaDto = {
      dataInicio: new Date('2022-01-01 00:00:00'),
      dataFim: new Date('2022-01-01 01:00:00'),
      medicoId: 1,
      pacienteId: 1
    }

    // act
    const result = await sut.agendar(data)

    // assert
    expect(result).toEqual({
      id: 1,
      dataInicio: new Date('2022-01-01 00:00:00'),
      dataFim: new Date('2022-01-01 01:00:00'),
      medicoId: 1,
      pacienteId: 1,
      status: ConsultaStatus.Pendente
    })
  })
})
