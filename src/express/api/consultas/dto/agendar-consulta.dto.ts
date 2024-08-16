import { z } from 'zod'
import { type ConsultaDto } from '../../../../application/dto/consulta/consulta.dto'

export class AgendarConsultaDto implements ConsultaDto {
  pacienteId: number
  medicoId: number
  dataInicio: Date
  dataFim: Date

  constructor (body: any) {
    const data = z.object({
      pacienteId: z.number().positive(),
      medicoId: z.number().positive(),
      dataInicio: z.string().datetime().pipe(z.coerce.date()),
      dataFim: z.string().datetime().pipe(z.coerce.date())
    }).parse(body)

    this.pacienteId = data.pacienteId
    this.medicoId = data.medicoId
    this.dataInicio = data.dataInicio
    this.dataFim = data.dataFim
  }
}
