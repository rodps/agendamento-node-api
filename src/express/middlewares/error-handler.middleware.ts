import { type NextFunction, type Request, type Response } from 'express'
import { ApplicationError } from '../../application/errors/application.error'
import { ZodError } from 'zod'

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  if (err === undefined) {
    next()
    return
  }

  if (err instanceof ApplicationError) {
    res.status(err.statusCode).json({ erro: err.message, type: 'APPLICATION_ERROR' })
  } if (err instanceof ZodError) {
    const errors = err.errors.map((issue: any) => ({
      path: issue.path,
      message: issue.message
    }))
    res.status(400).json({ erro: errors })
  } else {
    res.status(500).json({ erro: 'Internal server error', type: 'INTERNAL_SERVER_ERROR' })
  }
}

export { errorHandler }
