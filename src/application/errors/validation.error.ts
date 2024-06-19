export class ValidationError extends Error {
  constructor (readonly errors: any) {
    super('Erro de validação')
  }
}
