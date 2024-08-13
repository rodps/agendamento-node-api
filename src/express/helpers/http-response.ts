import { type Response } from 'express'

export interface IResponseBody {
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

export interface IHttpResponse {
  send: (statusCode: number, body?: IResponseBody) => void
}

export function HttpResponse (res: Response): IHttpResponse {
  const send = (statusCode: number, body?: IResponseBody): void => {
    res.status(statusCode).json(body)
  }
  return {
    send
  }
}
