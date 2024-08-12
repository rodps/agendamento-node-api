import { type NextFunction, type Request, type Response } from 'express'
import { ApplicationError } from '../../application/errors/application.error'
import { ZodError } from 'zod'
import { HttpResponse, type IHttpResponse } from '../helpers/http-response'

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  if (err === undefined) {
    next()
  }
  const { statusCode, body } = getErrorResponse(err)
  res.status(statusCode).json(body)
}

const getErrorResponse = (err: Error): IHttpResponse => {
  if (err instanceof ApplicationError) {
    return HttpResponse.badRequest(err.message)
  }
  if (err instanceof ZodError) {
    const errors = err.errors.map((issue: any) => ({
      path: issue.path,
      message: issue.message
    }))
    return HttpResponse.badRequest(err.message, errors)
  } else {
    return HttpResponse.internalServerError()
  }
}

export { errorHandler }
