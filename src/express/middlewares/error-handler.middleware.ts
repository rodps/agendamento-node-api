import { type NextFunction, type Request, type Response } from 'express'
import { ApplicationError } from '../../application/errors/application.error'
import { ZodError } from 'zod'
import { HttpResponse } from '../helpers/http-response'
import { ErrorTypes } from '../constants/error-types'
import { JwtDecodeError } from '../../application/errors/jwt-decode.error'
import { TokenNotFoundError } from '../errors/token-not-found.error'

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  if (err === undefined) {
    next()
  }

  if (err instanceof ApplicationError) {
    HttpResponse(res).send(400, {
      error: {
        message: err.message,
        type: ErrorTypes.APPLICATION_ERROR
      }
    })
  } else if (err instanceof ZodError) {
    const errors = err.errors.map((issue: any) => ({
      path: issue.path,
      message: issue.message
    }))
    HttpResponse(res).send(400, {
      error: {
        message: 'Parâmetros inválidos',
        type: ErrorTypes.PARAM_ERROR,
        errors
      }
    })
  } else if (err instanceof JwtDecodeError) {
    HttpResponse(res).send(401, {
      error: {
        message: err.message,
        type: ErrorTypes.AUTHORIZATION_ERROR
      }
    })
  } else if (err instanceof TokenNotFoundError) {
    HttpResponse(res).send(401, {
      error: {
        message: err.message,
        type: ErrorTypes.AUTHORIZATION_ERROR
      }
    })
  } else {
    HttpResponse(res).send(500, {
      error: {
        message: 'Erro interno do servidor',
        type: ErrorTypes.INTERNAL_SERVER_ERROR
      }
    })
  }
}

export { errorHandler }
