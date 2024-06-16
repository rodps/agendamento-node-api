import { mock } from 'jest-mock-extended'
import { ApplicationError } from '../../../errors/application.error'
import { CadastrarMedicoService } from './cadastrar-medico.service'
import { type IMedicoRepository } from '../repository.interface'

describe('CadastrarMedicoService', () => {
  const medicoRepository = mock<IMedicoRepository>()

  beforeEach(async () => {
    jest.clearAllMocks()
  })

  test('deve lancar um erro quando o crm ja existir', async () => {
    // arrange
    jest.spyOn(medicoRepository, 'buscarPorCrm').mockResolvedValueOnce([{
      id: 1,
      crm: '111',
      especialidade: 'especialidade',
      nome: 'nome'
    }])

    const sut = new CadastrarMedicoService(medicoRepository)
    const dto = {
      crm: '123',
      especialidade: 'especialidade',
      nome: 'nome'
    }

    // assert
    await expect(sut.execute(dto)).rejects.toThrow(new ApplicationError('CRM ja existe'))
  })

  test('deve cadastrar um medico', async () => {
    // arrange
    jest.spyOn(medicoRepository, 'buscarPorCrm').mockResolvedValueOnce([])
    const medico = {
      id: 1,
      crm: '111',
      especialidade: 'especialidade',
      nome: 'nome'
    }
    jest.spyOn(medicoRepository, 'insert').mockResolvedValueOnce(medico)
    const data = {
      crm: '111',
      especialidade: 'especialidade',
      nome: 'nome'
    }
    const sut = new CadastrarMedicoService(medicoRepository)

    // act
    const result = await sut.execute(data)

    // assert
    expect(result).toEqual(medico)
  })

  test('deve chamar o repository corretamente', async () => {
    // arrange
    jest.spyOn(medicoRepository, 'insert').mockResolvedValueOnce({
      id: 1,
      crm: '111',
      especialidade: 'especialidade',
      nome: 'nome'
    })
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
    expect(medicoRepository.insert).toHaveBeenCalledWith(data)
  })
})
