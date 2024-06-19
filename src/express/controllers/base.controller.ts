import { type Request, type Response } from 'express'
import { ApplicationError } from '../../application/errors/application.error'
import { ValidationError } from '../../application/errors/validation.error'

export abstract class BaseController {
  public async handle (req: Request, res: Response): Promise<void> {
    try {
      await this._execute(req, res)
    } catch (err) {
      if (err instanceof ApplicationError) {
        res.status(err.statusCode).json({ erro: err.message, type: 'APPLICATION_ERROR' })
      } else if (err instanceof ValidationError) {
        res.status(400).json({ erro: err.errors, type: 'VALIDATION_ERROR' })
      } else {
        console.log(err)
        res.status(500).json({ erro: 'Internal server error', type: 'INTERNAL_SERVER_ERROR' })
      }
    }
  }

  protected abstract _execute (req: Request, res: Response): Promise<void>
}
