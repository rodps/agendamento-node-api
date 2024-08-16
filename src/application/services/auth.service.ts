import { type CadastrarDto } from '../dto/auth/cadastrar.dto'
import { type LoginDto } from '../dto/auth/login.dto'
import { type TokenDto } from '../dto/auth/token.dto'
import { Usuario } from '../entity/usuario.entity'
import { ApplicationError } from '../errors/application.error'
import { InvalidTokenError } from '../errors/invalid-token.error'
import { type IEncryptionService } from '../interfaces/encryption-service.interface'
import { type IJwtPayload, type IJwtService } from '../interfaces/jwt-service.interface'
import { type IUsuarioRepository } from '../interfaces/repository.interface'

export class AuthService {
  constructor (
    private readonly encryptionService: IEncryptionService,
    private readonly usuarioRepository: IUsuarioRepository,
    private readonly jwtService: IJwtService
  ) {}

  async login (dto: LoginDto): Promise<TokenDto> {
    const usuario = await this.usuarioRepository.buscarPorEmail(dto.email)
    if (usuario == null) {
      throw new ApplicationError('Email invalido')
    }

    if (!this.encryptionService.compare(dto.password, usuario.password)) {
      throw new ApplicationError('Senha invalida')
    }

    const token = this.jwtService.generateToken(usuario)
    return { token }
  }

  public async cadastrar (dto: CadastrarDto): Promise<Usuario> {
    const usuarios = await this.usuarioRepository.buscarPorEmail(dto.email)
    if (usuarios != null) {
      throw new ApplicationError('Este email já está cadastrado')
    }

    if (dto.password.length < 8) {
      throw new ApplicationError('A senha deve conter pelo menos 8 caracteres')
    }

    const user = Usuario.from(dto)
    user.password = this.encryptionService.hash(user.password)

    const inserted = await this.usuarioRepository.insert(user)
    return inserted
  }

  async validateToken (token: string): Promise<IJwtPayload> {
    try {
      return this.jwtService.decodeToken(token)
    } catch (error) {
      throw new InvalidTokenError('Token invalido')
    }
  }
}
