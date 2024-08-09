import { type Usuario } from '../entity/usuario.entity'

export interface IJwtService {
  generateToken: (usuario: Usuario) => string
  decodeToken: (token: string) => IJwtPayload
}

export interface IJwtPayload {
  sub: number
  exp: string
  nome: string
  role: string
}
