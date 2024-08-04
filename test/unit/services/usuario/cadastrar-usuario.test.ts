import { mock } from 'jest-mock-extended'
import { UsuarioService } from '../../../../src/application/services/usuario.service'
import { type IUsuarioRepository } from '../../../../src/application/interfaces/repository.interface'
import { UserRole, Usuario } from '../../../../src/application/entity/usuario.entity'
import { type IEncryptionService } from '../../../../src/application/interfaces/encryption-service.interface'
import { ApplicationError } from '../../../../src/application/errors/application.error'

describe('Cadastrar Usuário', () => {
  const usuarioRepository = mock<IUsuarioRepository>()
  const encryptionService = mock<IEncryptionService>()
  const sut = new UsuarioService(usuarioRepository, encryptionService)

  test('deve retornar um erro caso o email já esteja cadastrado', async () => {
    // arrange
    jest
      .spyOn(usuarioRepository, 'buscarPorEmail')
      .mockResolvedValueOnce(
        new Usuario(
          1,
          'nome',
          '12345678',
          'email@test.com',
          UserRole.ADMIN
        )
      )

    const dto = {
      email: 'email@test.com',
      nome: 'nome',
      password: '123'
    }

    // act
    const response = sut.cadastrar(dto)

    // assert
    await expect(response).rejects.toThrow(
      new Error('Este email já está cadastrado')
    )
  })

  test('deve retornar um erro caso a senha seja fraca', async () => {
    // arrange
    const dto = {
      email: 'email@test.com',
      nome: 'nome',
      password: '123'
    }

    // act
    const response = sut.cadastrar(dto)

    // assert
    await expect(response).rejects.toThrow(
      new ApplicationError('A senha deve conter pelo menos 8 caracteres')
    )
  })

  test('deve salvar o usuário corretamente', async () => {
    // arrange
    jest
      .spyOn(usuarioRepository, 'buscarPorEmail')
      .mockResolvedValueOnce(null)
    jest
      .spyOn(usuarioRepository, 'insert')
      .mockResolvedValueOnce(new Usuario(1, 'nome', '12345678', 'email@test.com', UserRole.ADMIN))
    jest
      .spyOn(encryptionService, 'hash')
      .mockReturnValueOnce('hashedPassword')

    const dto = {
      email: 'email@test.com',
      nome: 'nome',
      password: '12345678'
    }

    // act
    await sut.cadastrar(dto)

    // assert
    expect(usuarioRepository.insert).toHaveBeenCalledTimes(1)
    expect(usuarioRepository.insert).toHaveBeenCalledWith(
      new Usuario(null, 'nome', 'hashedPassword', 'email@test.com', UserRole.ADMIN)
    )
  })
})
