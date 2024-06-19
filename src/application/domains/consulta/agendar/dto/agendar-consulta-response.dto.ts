import { type Consulta, type ConsultaStatus } from '../../consulta.entity'

export class AgendarConsultaResponseDto {
  readonly id: number
  readonly dataInicio: Date
  readonly dataFim: Date
  readonly medicoId: number
  readonly pacienteId: number
  readonly status: ConsultaStatus

  constructor (consulta: Consulta) {
    if (consulta.id === undefined) {
      throw new Error('ID da consulta não informado')
    }
    this.id = consulta.id
    this.dataInicio = consulta.dataInicio
    this.dataFim = consulta.dataFim
    this.medicoId = consulta.medicoId
    this.pacienteId = consulta.pacienteId
    this.status = consulta.status
  }
}
