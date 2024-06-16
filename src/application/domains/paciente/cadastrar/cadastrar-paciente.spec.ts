import { mock } from 'jest-mock-extended'
import { CadastrarPacienteService } from './cadastrar-paciente.service'
import { type IPacienteRepository } from '../repository.interface'
import { ApplicationError } from '../../../errors/application.error'

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

    jest.spyOn(pacienteRepository, 'insert').mockResolvedValueOnce({
      id: 1,
      nome: 'nome',
      telefone: '123',
      cpf: '123',
      dataNascimento: '2022-01-01'
    })
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

    jest.spyOn(pacienteRepository, 'buscarPorCpf').mockResolvedValueOnce([{
      id: 1,
      nome: 'nome',
      telefone: '123',
      cpf: '123',
      dataNascimento: '2022-01-01'
    }])

    // assert
    await expect(sut.execute(dto)).rejects.toThrow(new ApplicationError('Este CPF já existe'))
  })

  test('deve chamar o repository corretamente', async () => {
    // arrange
    const dto = {
      nome: 'nome',
      telefone: '123',
      cpf: '123',
      dataNascimento: '2022-01-01'
    }

    jest.spyOn(pacienteRepository, 'insert').mockResolvedValueOnce({
      id: 1,
      nome: 'nome',
      telefone: '123',
      cpf: '123',
      dataNascimento: '2022-01-01'
    })
    jest.spyOn(pacienteRepository, 'buscarPorCpf').mockResolvedValueOnce([])

    // act
    await sut.execute(dto)

    // assert
    expect(pacienteRepository.insert).toHaveBeenCalledTimes(1)
    expect(pacienteRepository.insert).toHaveBeenCalledWith(dto)
  })
})
