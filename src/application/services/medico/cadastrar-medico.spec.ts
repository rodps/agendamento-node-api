import { mock } from 'jest-mock-extended'
import { ApplicationError } from '../../errors/application.error'
import { CadastrarMedicoService } from './cadastrar-medico.service'
import { type IMedicoRepository } from '../../interfaces/repository.interface'
import { Medico } from '../../entity/medico.entity'

describe('CadastrarMedicoService', () => {
  const medicoRepository = mock<IMedicoRepository>()

  beforeEach(async () => {
    jest.clearAllMocks()
  })

  test('deve lancar um erro quando o crm ja existir', async () => {
    // arrange
    jest.spyOn(medicoRepository, 'buscarPorCrm').mockResolvedValueOnce([
      new Medico(1, '111', 'especialidade', 'nome')
    ])

    const sut = new CadastrarMedicoService(medicoRepository)
    const dto = {
      crm: '123',
      especialidade: 'especialidade',
      nome: 'nome'
    }

    // assert
    await expect(sut.execute(dto)).rejects.toThrow(new ApplicationError('CRM já existe'))
  })

  test('deve cadastrar um medico', async () => {
    // arrange
    jest.spyOn(medicoRepository, 'buscarPorCrm').mockResolvedValueOnce([])
    jest.spyOn(medicoRepository, 'insert').mockResolvedValueOnce(
      new Medico(1, 'nome', '111', 'especialidade')
    )
    const data = {
      crm: '111',
      especialidade: 'especialidade',
      nome: 'nome'
    }
    const sut = new CadastrarMedicoService(medicoRepository)

    // act
    const result = await sut.execute(data)

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
    jest.spyOn(medicoRepository, 'insert').mockResolvedValueOnce(new Medico(1, '111', 'especialidade', 'nome'))
    jest.spyOn(medicoRepository, 'buscarPorCrm').mockResolvedValueOnce([])
    const data = {
      crm: '111',
      especialidade: 'especialidade',
      nome: 'nome'
    }
    const sut = new CadastrarMedicoService(medicoRepository)

    // act
    await sut.execute(data)

    // assert
    expect(medicoRepository.insert).toHaveBeenCalledTimes(1)
    expect(medicoRepository.insert).toHaveBeenCalledWith(new Medico(null, 'nome', '111', 'especialidade'))
  })
})
