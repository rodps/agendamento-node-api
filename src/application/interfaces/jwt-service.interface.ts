import { type Usuario } from '../entity/usuario.entity'

export interface IJwtService {
  generateToken: (usuario: Usuario) => string
}
