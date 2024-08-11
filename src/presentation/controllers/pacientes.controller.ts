import { type PacienteService } from '../../application/services/paciente.service'
import { CadastrarPacienteDto } from '../dto/pacientes/cadastrar-paciente.dto'
import { handleError } from '../helpers/error-handler'
import { HttpResponses } from '../helpers/http-responses'
import { type HttpResponse, type HttpRequest } from '../interfaces/http'

export class PacientesController {
  constructor (
    private readonly pacienteService: PacienteService
  ) {}

  public cadastrar = async (req: HttpRequest): Promise<HttpResponse> => {
    try {
      const result = await this.pacienteService.cadastrar(new CadastrarPacienteDto(req.body))
      return HttpResponses.created(result)
    } catch (err) {
      return handleError(err)
    }
  }
}
