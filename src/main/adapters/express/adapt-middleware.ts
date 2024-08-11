import { type NextFunction, type Request, type Response } from 'express'
import { type HttpResponse } from '../../../presentation/interfaces/http'
import { type IMiddleware } from '../../../presentation/interfaces/middleware'

export const toExpressMiddleware = (middleware: IMiddleware): (req: Request, res: Response, next: NextFunction) => void => {
  return (req: Request, res: Response, next: NextFunction) => {
    middleware.handle(req)
      .then((httpResponse: HttpResponse) => {
        if (httpResponse.statusCode === 200) {
          Object.assign(req, httpResponse.body)
          next()
        } else {
          res.status(httpResponse.statusCode).json(httpResponse.body)
        }
      })
      .catch((err) => { next(err) })
  }
}
