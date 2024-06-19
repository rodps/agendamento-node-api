import z from 'zod'
import { ValidationError } from '../../../../errors/validation.error'

export class AgendarConsultaDto {
  readonly medicoId: number
  readonly pacienteId: number
  readonly dataInicio: Date
  readonly dataFim: Date

  constructor (data: any) {
    const result = z.object({
      medicoId: z.number().positive(),
      pacienteId: z.number().positive(),
      dataInicio: z.string().datetime(),
      dataFim: z.string().datetime()
    }).safeParse(data)

    if (!result.success) {
      throw new ValidationError(result.error.issues)
    }

    this.medicoId = result.data.medicoId
    this.pacienteId = result.data.pacienteId
    this.dataInicio = new Date(result.data.dataInicio)
    this.dataFim = new Date(result.data.dataFim)
  }
}
