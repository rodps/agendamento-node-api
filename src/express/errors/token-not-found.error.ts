export class TokenNotFoundError extends Error {
  constructor () {
    super('Token não encontrado')
  }
}
