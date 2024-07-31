import { type Consulta, type ConsultaStatus } from '../../entity/consulta.entity'

export class ConsultaDtoRequest {
  constructor (
    readonly pacienteId: number,
    readonly medicoId: number,
    readonly dataInicio: Date,
    readonly dataFim: Date
  ) {}
}

export class ConsultaDtoResponse {
  readonly id: number
  readonly status: ConsultaStatus
  readonly pacienteId: number
  readonly medicoId: number
  readonly dataInicio: Date
  readonly dataFim: Date

  constructor (consulta: Consulta) {
    this.id = consulta.getIdOrThrow()
    this.status = consulta.status
    this.pacienteId = consulta.pacienteId
    this.medicoId = consulta.medicoId
    this.dataInicio = consulta.dataInicio
    this.dataFim = consulta.dataFim
  }
}
