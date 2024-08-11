import { type MedicoService } from '../../application/services/medico.service'
import { CadastrarMedicoDto } from '../dto/medicos/cadastrar-medico.dto'
import { handleError } from '../helpers/error-handler'
import { HttpResponses } from '../helpers/http-responses'
import { type HttpRequest, type HttpResponse } from '../interfaces/http'

export class MedicosController {
  constructor (
    private readonly medicoService: MedicoService
  ) {}

  public cadastrar = async (req: HttpRequest): Promise<HttpResponse> => {
    try {
      const result = await this.medicoService.cadastrar(new CadastrarMedicoDto(req.body))
      return HttpResponses.created(result)
    } catch (err) {
      return handleError(err)
    }
  }
}
