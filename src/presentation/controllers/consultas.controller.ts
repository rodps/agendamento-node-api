import { type ConsultaService } from '../../application/services/consulta.service'
import { AgendarConsultaDto } from '../dto/consultas/agendar-consulta.dto'
import { type HttpResponse, type HttpRequest } from '../interfaces/http'
import { HttpResponses } from '../helpers/http-responses'
import { handleError } from '../helpers/error-handler'

export class ConsultasController {
  constructor (
    private readonly consultaService: ConsultaService
  ) {}

  public agendar = async (req: HttpRequest): Promise<HttpResponse> => {
    try {
      const result = await this.consultaService.agendar(new AgendarConsultaDto(req.body))
      return HttpResponses.created(result)
    } catch (err) {
      return handleError(err)
    }
  }
}
