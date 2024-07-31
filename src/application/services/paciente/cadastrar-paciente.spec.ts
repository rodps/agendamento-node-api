import { mock } from 'jest-mock-extended'
import { CadastrarPacienteService } from './cadastrar-paciente.service'
import { ApplicationError } from '../../errors/application.error'
import { type IPacienteRepository } from '../../interfaces/repository.interface'
import { Paciente } from '../../entity/paciente.entity'

describe('Cadastrar Paciente', () => {
  const pacienteRepository = mock<IPacienteRepository>()
  const sut = new CadastrarPacienteService(pacienteRepository)

  beforeEach(async () => {
    jest.clearAllMocks()
  })

  test('deve cadastrar um paciente', async () => {
    // arrange
    const dto = {
      nome: 'nome',
      telefone: '123',
      cpf: '123',
      dataNascimento: '2022-01-01'
    }

    jest.spyOn(pacienteRepository, 'insert').mockResolvedValueOnce(
      new Paciente(1, 'nome', '123', '123', '2022-01-01')
    )
    jest.spyOn(pacienteRepository, 'buscarPorCpf').mockResolvedValueOnce([])

    // act
    const response = await sut.execute(dto)

    // assert
    expect(response).toEqual({
      id: 1,
      nome: 'nome',
      telefone: '123',
      cpf: '123',
      dataNascimento: '2022-01-01'
    })
  })

  test('deve retornar um erro quando o cpf ja existir', async () => {
    // arrange
    const dto = {
      nome: 'nome',
      telefone: '123',
      cpf: '123',
      dataNascimento: '2022-01-01'
    }

    jest.spyOn(pacienteRepository, 'buscarPorCpf').mockResolvedValueOnce([
      new Paciente(1, 'nome', '123', '123', '2022-01-01')
    ])

    // assert
    await expect(sut.execute(dto)).rejects.toThrow(new ApplicationError('CPF já existe'))
  })

  test('deve chamar o repository corretamente', async () => {
    // arrange
    const dto = {
      nome: 'nome',
      telefone: '123',
      cpf: '123',
      dataNascimento: '2022-01-01'
    }

    jest.spyOn(pacienteRepository, 'insert').mockResolvedValueOnce(
      new Paciente(1, 'nome', '123', '123', '2022-01-01')
    )
    jest.spyOn(pacienteRepository, 'buscarPorCpf').mockResolvedValueOnce([])

    // act
    await sut.execute(dto)

    // assert
    expect(pacienteRepository.insert).toHaveBeenCalledTimes(1)
    expect(pacienteRepository.insert).toHaveBeenCalledWith(new Paciente(null, 'nome', '123', '123', '2022-01-01'))
  })
})
