import { type Request, type Response } from 'express'
import { ApplicationError } from '../../application/errors/application.error'

export abstract class BaseController {
  public async handle (req: Request, res: Response): Promise<void> {
    try {
      await this._execute(req, res)
    } catch (err) {
      if (err instanceof ApplicationError) {
        res.status(err.statusCode).json({ erro: err.message })
      } else {
        console.log(err)
        res.status(500).json('Internal server error')
      }
    }
  }

  protected abstract _execute (req: Request, res: Response): Promise<void>
}
