import { type UsuarioDto } from '../dto/usuario/usuario.dto'
import { ApplicationEntity } from './_application.entity'
import { EMAIL_REGEX } from '../constants'
import { guard } from '../utils/guard'

export class Usuario extends ApplicationEntity {
  constructor (
    public readonly id: number | null,
    public nome: string,
    public password: string,
    public email: string,
    public role: UserRole
  ) {
    super(id)
    guard(nome, 'Nome obrigatorio')
    guard(password, 'Password obrigatorio')
    guard(EMAIL_REGEX.test(email), 'Email invalido')
    guard(role, 'Role obrigatorio')
  }

  static from (dto: UsuarioDto): Usuario {
    return new Usuario(
      null,
      dto.nome,
      dto.password,
      dto.email,
      UserRole.ADMIN
    )
  }
}

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER'
}
