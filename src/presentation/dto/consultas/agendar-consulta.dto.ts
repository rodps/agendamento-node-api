import { z } from 'zod'
import { ConsultaDtoRequest } from '../../../application/dto/consulta/consulta.dto'

export class AgendarConsultaDto extends ConsultaDtoRequest {
  constructor (body: any) {
    const data = z.object({
      pacienteId: z.number().positive(),
      medicoId: z.number().positive(),
      dataInicio: z.string().datetime().pipe(z.coerce.date()),
      dataFim: z.string().datetime().pipe(z.coerce.date())
    }).parse(body)

    super(data.pacienteId, data.medicoId, data.dataInicio, data.dataFim)
  }
}
