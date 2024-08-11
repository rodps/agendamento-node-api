export interface HttpRequest {
  body: any
  params: any
  headers: any
  usuario?: { id: number, role: string, nome: string }
}

export interface HttpResponse {
  statusCode: number
  body: {
    errors?: Array<{ path: string[], message: string }>
    message?: string
    data?: any
  }
}
