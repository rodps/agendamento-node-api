import { ZodError } from 'zod'
import { ApplicationError } from '../../application/errors/application.error'
import { type HttpResponse } from '../interfaces/http'
import { HttpResponses } from './http-responses'

export const handleError = (err: unknown): HttpResponse => {
  if (err instanceof ApplicationError) {
    return {
      statusCode: err.statusCode,
      body: {
        message: err.message
      }
    }
  }
  if (err instanceof ZodError) {
    const errors = err.errors.map((issue: any) => ({
      path: issue.path,
      message: issue.message
    }))

    return HttpResponses.badRequest({ errors, message: 'Requisição inválida' })
  } else {
    return HttpResponses.internalServerError()
  }
}
