import { type NextFunction, type Request, type Response } from 'express'
import { ApplicationError } from '../../application/errors/application.error'
import { ValidationError } from '../../application/errors/validation.error'

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  if (err === undefined) {
    next()
    return
  }

  if (err instanceof ApplicationError) {
    res.status(err.statusCode).json({ erro: err.message, type: 'APPLICATION_ERROR' })
  } else if (err instanceof ValidationError) {
    res.status(400).json({ erro: err.errors, type: 'VALIDATION_ERROR' })
  } else {
    console.log(err)
    res.status(500).json({ erro: 'Internal server error', type: 'INTERNAL_SERVER_ERROR' })
  }
}

export { errorHandler }
