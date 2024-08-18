import { mock } from 'jest-mock-extended'
import { type IMedicoRepository } from '../../../../src/application/interfaces/repository.interface'
import { ApplicationError } from '../../../../src/application/errors/application.error'
import { Medico } from '../../../../src/application/entity/medico.entity'
import { MedicoService } from '../../../../src/application/services/medico.service'

describe('Medico Service: cadastrar', () => {
  const medicoRepository = mock<IMedicoRepository>()
  const sut = new MedicoService(medicoRepository)

  beforeEach(async () => {
    jest.clearAllMocks()
  })

  test('deve lancar um erro quando o crm ja existir', async () => {
    // arrange
    jest
      .spyOn(medicoRepository, 'buscarPorCrm')
      .mockResolvedValueOnce([new Medico(1, '111', 'especialidade', 'nome')])

    const dto = {
      crm: '123',
      especialidade: 'especialidade',
      nome: 'nome'
    }

    // act & assert
    try {
      await sut.cadastrar(dto)
      fail()
    } catch (error) {
      expect(error).toBeInstanceOf(ApplicationError)
      expect(error).toHaveProperty('message', 'CRM já existe')
    }
  })

  test('deve cadastrar um medico', async () => {
    // arrange
    jest.spyOn(medicoRepository, 'buscarPorCrm').mockResolvedValueOnce([])
    jest
      .spyOn(medicoRepository, 'insert')
      .mockResolvedValueOnce(new Medico(1, 'nome', '111', 'especialidade'))
    const data = {
      crm: '111',
      especialidade: 'especialidade',
      nome: 'nome'
    }

    // act
    const result = await sut.cadastrar(data)

    // assert
    expect(result).toEqual({
      id: 1,
      crm: '111',
      especialidade: 'especialidade',
      nome: 'nome'
    })
  })

  test('deve chamar o repository corretamente', async () => {
    // arrange
    jest
      .spyOn(medicoRepository, 'insert')
      .mockResolvedValueOnce(new Medico(1, '111', 'especialidade', 'nome'))
    jest.spyOn(medicoRepository, 'buscarPorCrm').mockResolvedValueOnce([])
    const data = {
      crm: '111',
      especialidade: 'especialidade',
      nome: 'nome'
    }

    // act
    await sut.cadastrar(data)

    // assert
    expect(medicoRepository.insert).toHaveBeenCalledTimes(1)
    expect(medicoRepository.insert).toHaveBeenCalledWith(
      new Medico(null, 'nome', '111', 'especialidade')
    )
  })
})
