import { type UsuarioService } from '../../application/services/usuario.service'
import { CadastrarUsuarioDto } from '../dto/usuarios/cadastrar-usuario.dto'
import { handleError } from '../helpers/error-handler'
import { HttpResponses } from '../helpers/http-responses'
import { type HttpRequest, type HttpResponse } from '../interfaces/http'

export class UsuariosController {
  constructor (
    private readonly usuarioService: UsuarioService
  ) {}

  public cadastrar = async (req: HttpRequest): Promise<HttpResponse> => {
    try {
      const result = await this.usuarioService.cadastrar(new CadastrarUsuarioDto(req.body))
      return HttpResponses.created(result)
    } catch (err) {
      return handleError(err)
    }
  }
}
