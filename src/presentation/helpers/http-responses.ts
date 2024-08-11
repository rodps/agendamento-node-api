import { type HttpResponse } from '../interfaces/http'

export const HttpResponses = (function () {
  const ok = (data: any): HttpResponse => ({
    statusCode: 200,
    body: {
      data
    }
  })

  const created = (data: any): HttpResponse => ({
    statusCode: 201,
    body: {
      data
    }
  })

  const badRequest = (data: {
    errors?: Array<{ path: string[], message: string }>
    message: string
  }): HttpResponse => ({
    statusCode: 400,
    body: {
      errors: data.errors,
      message: data.message
    }
  })

  const internalServerError = (): HttpResponse => ({
    statusCode: 500,
    body: {
      message: 'Erro interno do servidor'
    }
  })

  const unauthorized = (): HttpResponse => ({
    statusCode: 401,
    body: {
      message: 'Não autorizado'
    }
  })

  return {
    ok,
    created,
    badRequest,
    internalServerError,
    unauthorized
  }
}())
