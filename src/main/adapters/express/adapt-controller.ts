import { type Response, type Request, type NextFunction } from 'express'
import { type HttpRequest, type HttpResponse } from '../../../presentation/interfaces/http'

export const toExpressHandler = (handler: (req: HttpRequest) => Promise<HttpResponse>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.params,
      headers: req.headers,
      usuario: req.user
    }
    handler(httpRequest)
      .then((httpResponse) => {
        res.status(httpResponse.statusCode).json(httpResponse.body)
      })
      .catch((err) => { next(err) })
  }
}
