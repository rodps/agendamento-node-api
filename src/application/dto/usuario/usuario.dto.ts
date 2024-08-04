import { type Usuario } from '../../entity/usuario.entity'

export class UsuarioDtoRequest {
  constructor (
    readonly nome: string,
    readonly email: string,
    readonly password: string
  ) {}
}

export class UsuarioDtoResponse {
  constructor (
    readonly id: number,
    readonly nome: string,
    readonly email: string,
    readonly role: string
  ) {}

  static fromEntity (usuario: Usuario): UsuarioDtoResponse {
    return new UsuarioDtoResponse(
      usuario.getIdOrThrow(),
      usuario.nome,
      usuario.email,
      usuario.role
    )
  }
}
