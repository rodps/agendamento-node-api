import { type Consulta, type ConsultaStatus } from '../../../../entity/consulta.entity'

export class AgendarConsultaResponseDto {
  readonly id: number
  readonly dataInicio: Date
  readonly dataFim: Date
  readonly medicoId: number
  readonly pacienteId: number
  readonly status: ConsultaStatus

  constructor (consulta: Consulta) {
    this.id = consulta.getIdOrThrow()
    this.dataInicio = consulta.dataInicio
    this.dataFim = consulta.dataFim
    this.medicoId = consulta.medicoId
    this.pacienteId = consulta.pacienteId
    this.status = consulta.status
  }
}
