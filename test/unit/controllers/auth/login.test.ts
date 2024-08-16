/* eslint-disable @typescript-eslint/unbound-method */
import { mock } from 'jest-mock-extended'
import { AuthController } from '../../../../src/express/api/auth/auth.controller'
import { type AuthService } from '../../../../src/application/services/auth.service'
import httpMocks from 'node-mocks-http'
import { LoginDtoRequest } from '../../../../src/express/api/auth/dto/login.dto'

describe('AuthController: login', () => {
  const authService = mock<AuthService>()
  const sut = new AuthController(authService)

  test('deve chamar o service corretamente', async () => {
    // arrange
    const req = httpMocks.createRequest({
      body: { email: 'email', password: 'password' }
    })
    const res = httpMocks.createResponse()
    // act
    await sut.login(req, res, () => {})

    // assert
    expect(authService.login).toHaveBeenCalledTimes(1)
    expect(authService.login).toHaveBeenCalledWith(new LoginDtoRequest(req.body))
  })

  test('deve retornar o resultado correto', async () => {
    // arrange
    const req = httpMocks.createRequest({
      body: { email: 'email', password: 'password' }
    })
    const res = httpMocks.createResponse()
    const result = { token: 'token' }
    authService.login.mockResolvedValueOnce(result)

    // act
    await sut.login(req, res, () => {})

    // assert
    expect(res.statusCode).toBe(200)

    const data = res._getJSONData()
    expect(data).toEqual({ data: result })
  })

  test('deve chamar a função next quanto ocorrer um erro', async () => {
    // arrange
    const req = httpMocks.createRequest({
      body: { email: 'email', password: 'password' }
    })
    const res = httpMocks.createResponse()
    const next = jest.fn()
    const error = new Error('error')
    authService.login.mockImplementationOnce(() => { throw error })

    // act
    await sut.login(req, res, next)

    // assert
    expect(next).toHaveBeenCalledTimes(1)
    expect(next).toHaveBeenCalledWith(error)
  })
})
