import { UsuarioDtoResponse, type UsuarioDtoRequest } from '../dto/usuario/usuario.dto'
import { Usuario } from '../entity/usuario.entity'
import { type IEncryptionService } from '../interfaces/encryption-service.interface'
import { type IUsuarioRepository } from '../interfaces/repository.interface'
import { isNull, isStrongPassword } from '../utils/validator'

export class UsuarioService {
  constructor (
    private readonly usuarioRepository: IUsuarioRepository,
    private readonly encryptionService: IEncryptionService
  ) {}

  public async cadastrar (dto: UsuarioDtoRequest): Promise<UsuarioDtoResponse> {
    const usuarios = await this.usuarioRepository.buscarPorEmail(dto.email)
    isNull(usuarios, 'Este email já está cadastrado')

    isStrongPassword(dto.password, 'A senha deve conter pelo menos 8 caracteres')

    const user = Usuario.fromDto(dto)
    user.password = this.encryptionService.hash(user.password)

    const result = await this.usuarioRepository.insert(user)
    return UsuarioDtoResponse.fromEntity(result)
  }

  public async buscarPorEmail (email: string): Promise<Usuario | null> {
    const usuario = await this.usuarioRepository.buscarPorEmail(email)
    return usuario
  }
}
