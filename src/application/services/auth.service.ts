import { type LoginDtoRequest, LoginDtoResponse } from '../dto/auth/login.dto'
import { ApplicationError } from '../errors/application.error'
import { JwtDecodeError } from '../errors/jwt-decode.error'
import { type IEncryptionService } from '../interfaces/encryption-service.interface'
import { type IJwtPayload, type IJwtService } from '../interfaces/jwt-service.interface'
import { type IUsuarioRepository } from '../interfaces/repository.interface'

export class AuthService {
  constructor (
    private readonly encryptionService: IEncryptionService,
    private readonly usuarioRepository: IUsuarioRepository,
    private readonly jwtService: IJwtService
  ) {}

  async login (dto: LoginDtoRequest): Promise<LoginDtoResponse> {
    const usuario = await this.usuarioRepository.buscarPorEmail(dto.email)
    if (usuario == null) {
      throw new ApplicationError('Email invalido')
    }

    if (!this.encryptionService.compare(dto.password, usuario.password)) {
      throw new ApplicationError('Senha invalida')
    }

    const token = this.jwtService.generateToken(usuario)
    return new LoginDtoResponse(token)
  }

  async validateToken (token: string): Promise<IJwtPayload> {
    try {
      return this.jwtService.decodeToken(token)
    } catch (error) {
      throw new JwtDecodeError('Token invalido')
    }
  }
}
