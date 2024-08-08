import { ApplicationError } from '../errors/application.error'
import { type IEncryptionService } from '../interfaces/encryption-service.interface'
import { type IJwtService } from '../interfaces/jwt-service.interface'
import { type IUsuarioRepository } from '../interfaces/repository.interface'

export class AuthService {
  constructor (
    private readonly encryptionService: IEncryptionService,
    private readonly usuarioRepository: IUsuarioRepository,
    private readonly jwtService: IJwtService
  ) {}

  async login (email: string, password: string): Promise<string> {
    const usuario = await this.usuarioRepository.buscarPorEmail(email)
    if (usuario == null) {
      throw new ApplicationError('Email invalido')
    }

    if (!this.encryptionService.compare(password, usuario.password)) {
      throw new ApplicationError('Senha invalida')
    }

    return this.jwtService.generateToken(usuario)
  }
}
