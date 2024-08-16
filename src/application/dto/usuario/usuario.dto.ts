import { type Usuario } from '../../entity/usuario.entity'

export class UsuarioDtoRequest {
  constructor (
    readonly nome: string,
    readonly email: string,
    readonly password: string
  ) {}
}

export class UsuarioDtoResponse {
  readonly id: number
  readonly nome: string
  readonly email: string
  readonly role: string

  constructor (usuario: Usuario) {
    this.id = usuario.getIdOrThrow()
    this.nome = usuario.nome
    this.email = usuario.email
    this.role = usuario.role
  }
}
