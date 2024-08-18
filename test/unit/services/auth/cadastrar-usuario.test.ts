import { mock } from 'jest-mock-extended'
import { type IUsuarioRepository } from '../../../../src/application/interfaces/repository.interface'
import { UserRole, Usuario } from '../../../../src/application/entity/usuario.entity'
import { type IEncryptionService } from '../../../../src/application/interfaces/encryption-service.interface'
import { AuthService } from '../../../../src/application/services/auth.service'
import { type IJwtService } from '../../../../src/application/interfaces/jwt-service.interface'
import { ApplicationError } from '../../../../src/application/errors/application.error'

describe('Auth Service: cadastrar usuário', () => {
  const usuarioRepository = mock<IUsuarioRepository>()
  const encryptionService = mock<IEncryptionService>()
  const jwtService = mock<IJwtService>()
  const sut = new AuthService(encryptionService, usuarioRepository, jwtService)

  test('deve retornar um erro caso o email já esteja cadastrado', async () => {
    // arrange
    jest
      .spyOn(usuarioRepository, 'buscarPorEmail')
      .mockResolvedValue(
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

    // act & assert
    try {
      await sut.cadastrar(dto)
      fail()
    } catch (error) {
      expect(error).toBeInstanceOf(ApplicationError)
      expect(error).toHaveProperty('message', 'Este email já está cadastrado')
    }
  })

  test('deve retornar um erro caso a senha seja fraca', async () => {
    // arrange
    const dto = {
      email: 'email@test.com',
      nome: 'nome',
      password: '123'
    }

    jest
      .spyOn(usuarioRepository, 'buscarPorEmail')
      .mockResolvedValue(null)

    // act & assert
    try {
      await sut.cadastrar(dto)
      fail()
    } catch (error) {
      expect(error).toBeInstanceOf(ApplicationError)
      expect(error).toHaveProperty('message', 'A senha deve conter pelo menos 8 caracteres')
    }
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
