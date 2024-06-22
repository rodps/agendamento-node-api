import { mock } from 'jest-mock-extended'
import { AgendarConsultaService } from './agendar-consulta.service'
import { type AgendarConsultaDto } from './dto/agendar-consulta.dto'
import { ApplicationError } from '../../../errors/application.error'
import { type IMedicoRepository } from '../../../repository/medico-repository.interface'
import { type IConsultaRepository } from '../../../repository/consulta-repository.interface'
import { type IPacienteRepository } from '../../../repository/paciente-repository.interface'
import { Consulta, ConsultaStatus } from '../../../entity/consulta.entity'

describe('AgendarConsultaService', () => {
  const consultaRepository = mock<IConsultaRepository>()
  const medicoRepository = mock<IMedicoRepository>()
  const pacienteRepository = mock<IPacienteRepository>()

  consultaRepository.buscarPorData.mockResolvedValue([])
  consultaRepository.insert.mockResolvedValue(
    new Consulta(1, new Date('2022-01-01 00:00:00'), new Date('2022-01-01 01:00:00'), 1, 1, ConsultaStatus.Pendente)
  )

  const sut = new AgendarConsultaService(consultaRepository, medicoRepository, pacienteRepository)

  beforeEach(async () => {
    jest.clearAllMocks()
  })

  test('deve chamar o repository corretamente', async () => {
    // arrange
    const data: AgendarConsultaDto = {
      dataInicio: new Date('2022-01-01 00:00:00'),
      dataFim: new Date('2022-01-01 01:00:00'),
      medicoId: 1,
      pacienteId: 1
    }

    // act
    await sut.execute(data)

    // assert
    expect(consultaRepository.insert).toHaveBeenCalledTimes(1)
    expect(consultaRepository.insert).toHaveBeenCalledWith(new Consulta(null, data.dataInicio, data.dataFim, data.medicoId, data.pacienteId, ConsultaStatus.Pendente))
  })

  test('deve retornar um erro quando o horário estiver indisponível', async () => {
    // arrange
    const data: AgendarConsultaDto = {
      dataInicio: new Date('2022-01-01 00:00:00'),
      dataFim: new Date('2022-01-01 01:00:00'),
      medicoId: 1,
      pacienteId: 1
    }
    jest.spyOn(consultaRepository, 'buscarPorData').mockResolvedValueOnce([
      new Consulta(
        1,
        data.dataInicio,
        data.dataFim,
        data.medicoId,
        data.pacienteId,
        ConsultaStatus.Pendente
      )
    ])

    // act
    const promise = sut.execute(data)

    // assert
    await expect(promise).rejects.toThrow(new ApplicationError('Horário indisponível'))
  })

  test('deve retornar um erro quando a data inicial for maior que a data final', async () => {
    // arrange
    const data: AgendarConsultaDto = {
      dataInicio: new Date('2022-01-01 01:00:00'),
      dataFim: new Date('2022-01-01 00:00:00'),
      medicoId: 1,
      pacienteId: 1
    }

    // act
    const promise = sut.execute(data)

    // assert
    await expect(promise).rejects.toThrow(new ApplicationError('Data inicial deve ser anterior a data final'))
  })

  test('deve retornar uma consulta', async () => {
    // arrange
    const data: AgendarConsultaDto = {
      dataInicio: new Date('2022-01-01 00:00:00'),
      dataFim: new Date('2022-01-01 01:00:00'),
      medicoId: 1,
      pacienteId: 1
    }

    // act
    const result = await sut.execute(data)

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
