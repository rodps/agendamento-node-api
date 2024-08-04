import { type UsuarioDtoRequest } from '../dto/usuario/usuario.dto'
import { isEmail, isNotEmpty } from '../utils/validator'
import { ApplicationEntity } from './_application.entity'

export class Usuario extends ApplicationEntity {
  constructor (
    public readonly id: number | null,
    public nome: string,
    public password: string,
    public email: string,
    public role: UserRole
  ) {
    super(id)
    isNotEmpty(nome, 'Nome obrigatorio')
    isNotEmpty(password, 'Password obrigatorio')
    isEmail(email, 'Email invalido')
    isNotEmpty(role, 'Role obrigatorio')
  }

  static fromDto (dto: UsuarioDtoRequest): Usuario {
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
