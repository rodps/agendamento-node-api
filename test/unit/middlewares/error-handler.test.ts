import { ZodError } from 'zod'
import { errorHandler } from '../../../src/express/middlewares/error-handler.middleware'
import httpMocks from 'node-mocks-http'
import { type IResponseBody } from '../../../src/express/helpers/http-response'
import { ErrorTypes } from '../../../src/express/constants/error-types'
import { ApplicationError } from '../../../src/application/errors/application.error'
import { InvalidTokenError } from '../../../src/application/errors/invalid-token.error'
import { TokenNotFoundError } from '../../../src/express/errors/token-not-found.error'

describe('Error Handler Middleware', () => {
  it('deve retornar 400 quando o erro for do tipo ApplicationError', async () => {
    // arrange
    const error = new ApplicationError('error')
    const req = httpMocks.createRequest()
    const res = httpMocks.createResponse()
    const next = jest.fn()

    // act
    errorHandler(error, req, res, next)

    // assert
    expect(res.statusCode).toBe(400)

    const body = res._getJSONData()
    const responseBody: IResponseBody = {
      error: {
        type: ErrorTypes.APPLICATION_ERROR,
        message: 'error'
      }
    }
    expect(body).toEqual(responseBody)
  })

  it('deve retornar 400 quando o erro for do tipo ZodError', async () => {
    // arrange
    const error = new ZodError([
      {
        code: 'invalid_type',
        expected: 'string',
        received: 'undefined',
        path: ['email'],
        message: 'Required'
      }
    ])
    const req = httpMocks.createRequest()
    const res = httpMocks.createResponse()
    const next = jest.fn()

    // act
    errorHandler(error, req, res, next)

    // assert
    expect(res.statusCode).toBe(400)

    const body = res._getJSONData()
    const responseBody: IResponseBody = {
      error: {
        type: ErrorTypes.PARAM_ERROR,
        message: 'Parâmetros inválidos',
        errors: [
          {
            path: ['email'],
            message: 'Required'
          }
        ]
      }
    }
    expect(body).toEqual(responseBody)
  })

  it('deve retornar 401 quando o erro for do tipo InvalidTokenError', async () => {
    // arrange
    const error = new InvalidTokenError('error')
    const req = httpMocks.createRequest()
    const res = httpMocks.createResponse()
    const next = jest.fn()

    // act
    errorHandler(error, req, res, next)

    // assert
    expect(res.statusCode).toBe(401)

    const body = res._getJSONData()
    const responseBody: IResponseBody = {
      error: {
        type: ErrorTypes.AUTHORIZATION_ERROR,
        message: 'error'
      }
    }
    expect(body).toEqual(responseBody)
  })

  it('deve retornar 401 quando o erro for do tipo TokenNotFoundError', async () => {
    // arrange
    const error = new TokenNotFoundError()
    const req = httpMocks.createRequest()
    const res = httpMocks.createResponse()
    const next = jest.fn()

    // act
    errorHandler(error, req, res, next)

    // assert
    expect(res.statusCode).toBe(401)

    const body = res._getJSONData()
    const responseBody: IResponseBody = {
      error: {
        type: ErrorTypes.AUTHORIZATION_ERROR,
        message: error.message
      }
    }
    expect(body).toEqual(responseBody)
  })

  it('deve retornar 500 quando o erro for do tipo Error', async () => {
    // arrange
    const error = new Error('error')
    const req = httpMocks.createRequest()
    const res = httpMocks.createResponse()
    const next = jest.fn()

    // act
    errorHandler(error, req, res, next)

    // assert
    expect(res.statusCode).toBe(500)

    const body = res._getJSONData()
    const responseBody: IResponseBody = {
      error: {
        type: ErrorTypes.INTERNAL_SERVER_ERROR,
        message: 'Erro interno do servidor'
      }
    }
    expect(body).toEqual(responseBody)
  })
})
