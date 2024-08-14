import { mock } from 'jest-mock-extended'
import { AuthMiddleware } from '../../../src/express/middlewares/authentication.middleware'
import { type AuthService } from '../../../src/application/services/auth.service'
import httpMocks from 'node-mocks-http'
import { TokenNotFoundError } from '../../../src/express/errors/token-not-found.error'

describe('AuthMiddleware', () => {
  const authService = mock<AuthService>()
  const sut = new AuthMiddleware(authService)

  it('deve retornar um erro caso o token não seja encontrado', async () => {
    // arrange
    const req = httpMocks.createRequest()
    const res = httpMocks.createResponse()
    const next = jest.fn()
    // act
    await sut.handle(req, res, next)
    // assert
    expect(next).toHaveBeenCalledTimes(1)
    expect(next).toHaveBeenCalledWith(new TokenNotFoundError())
  })

  it('deve retornar um erro quando o token for invalido', async () => {
    // arrange
    const req = httpMocks.createRequest({
      headers: { authorization: 'Bearer token' }
    })
    const res = httpMocks.createResponse()
    const next = jest.fn()
    const error = new Error('error')
    authService.validateToken.mockImplementationOnce(() => { throw error })
    // act
    await sut.handle(req, res, next)
    // assert
    expect(next).toHaveBeenCalledTimes(1)
    expect(next).toHaveBeenCalledWith(error)
  })

  it('deve chamar o next quando o token for valido', async () => {
    // arrange
    const req = httpMocks.createRequest({
      headers: { authorization: 'Bearer token' }
    })
    const res = httpMocks.createResponse()
    const next = jest.fn()
    authService.validateToken.mockResolvedValueOnce({ sub: 1, nome: 'nome', role: 'role', exp: 'exp' })
    // act
    await sut.handle(req, res, next)
    // assert
    expect(next).toHaveBeenCalledTimes(1)
  })

  it('deve atribuir o user corretamente', async () => {
    // arrange
    const req = httpMocks.createRequest({
      headers: { authorization: 'Bearer token' }
    })
    const res = httpMocks.createResponse()
    const next = jest.fn()
    authService.validateToken.mockResolvedValueOnce({ sub: 1, nome: 'nome', role: 'role', exp: 'exp' })
    // act
    await sut.handle(req, res, next)
    // assert
    expect(req.user).toEqual({ id: 1, nome: 'nome', role: 'role' })
  })
})
