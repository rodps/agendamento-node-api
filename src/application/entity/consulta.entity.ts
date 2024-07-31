import { type ConsultaDtoRequest } from '../dto/consulta/consulta.dto'
import { ApplicationError } from '../errors/application.error'
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
    if (this.dataInicio === undefined) {
      throw new ApplicationError('Data de inicio obrigatorio')
    }
    if (this.dataFim === undefined) {
      throw new ApplicationError('Data de fim obrigatorio')
    }
    if (this.dataInicio > this.dataFim) {
      throw new ApplicationError('Data inicial deve ser anterior a data final')
    }
    if (this.medicoId === undefined || this.medicoId < 0) {
      throw new ApplicationError('medicoId obrigatorio')
    }
    if (this.pacienteId === undefined || this.pacienteId < 0) {
      throw new ApplicationError('pacienteId obrigatorio')
    }
    if (this.status === undefined) {
      throw new ApplicationError('Status obrigatorio')
    }
  }

  static from (dto: ConsultaDtoRequest): Consulta {
    return new Consulta(
      null,
      dto.dataInicio,
      dto.dataFim,
      dto.medicoId,
      dto.pacienteId,
      ConsultaStatus.Pendente
    )
  }
}

export enum ConsultaStatus {
  Pendente = 'PENDENTE',
  Realizada = 'REALIZADA',
  Cancelada = 'CANCELADA'
}
