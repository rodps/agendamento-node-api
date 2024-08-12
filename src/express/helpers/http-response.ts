export interface IHttpResponse {
  statusCode: number
  body: {
    data?: any
    error?: {
      message: string
      type: string
      errors?: Array<{
        path: string[]
        message: string
      }>
    }
  }
}

export const HttpResponse = (function () {
  const ok = (data: any): IHttpResponse => ({
    statusCode: 200,
    body: {
      data
    }
  })

  const created = (data: any): IHttpResponse => ({
    statusCode: 201,
    body: {
      data
    }
  })

  const badRequest = (
    message: string,
    errors?: Array<{
      path: string[]
      message: string
    }>
  ): IHttpResponse => ({
    statusCode: 400,
    body: {
      error: {
        message,
        errors,
        type: 'BAD_REQUEST'
      }
    }
  })

  const unauthorized = (): IHttpResponse => ({
    statusCode: 401,
    body: {
      error: {
        message: 'Não autorizado',
        type: 'UNAUTHORIZED'
      }
    }
  })

  const internalServerError = (): IHttpResponse => ({
    statusCode: 500,
    body: {
      error: {
        message: 'Erro interno',
        type: 'INTERNAL_SERVER_ERROR'
      }
    }
  })

  return {
    ok,
    created,
    badRequest,
    unauthorized,
    internalServerError
  }
}())
