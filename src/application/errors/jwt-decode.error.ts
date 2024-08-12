export class JwtDecodeError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'JwtDecodeError'
  }
}
