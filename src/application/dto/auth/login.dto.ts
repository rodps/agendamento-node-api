export class LoginDtoRequest {
  constructor (
    readonly email: string,
    readonly password: string
  ) {}
}

export class LoginDtoResponse {
  constructor (
    readonly token: string
  ) {}
}
