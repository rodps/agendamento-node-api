import { ApplicationEntity } from './_application.entity'

export class Consulta extends ApplicationEntity {
  constructor (
    readonly id: number | null,
    readonly dataInicio: Date,
    readonly dataFim: Date,
    readonly medicoId: number,
    readonly pacienteId: number,
    readonly status: ConsultaStatus
  ) {
    super(id)
    if (this.dataInicio === undefined || this.dataFim === undefined) {
      throw new Error('Data de inicio e fim obrigatorio')
    }
    if (this.medicoId === undefined || this.medicoId < 0) {
      throw new Error('medicoId obrigatorio')
    }
    if (this.pacienteId === undefined || this.pacienteId < 0) {
      throw new Error('pacienteId obrigatorio')
    }
    if (this.status === undefined) {
      throw new Error('Status obrigatorio')
    }
  }
}

export enum ConsultaStatus {
  Pendente = 'PENDENTE',
  Realizada = 'REALIZADA',
  Cancelada = 'CANCELADA'
}
