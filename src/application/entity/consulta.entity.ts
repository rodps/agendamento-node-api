import { type ConsultaDtoRequest } from '../dto/consulta/consulta.dto'
import { Validator } from '../utils/validator'
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
    Validator.isNotNull(dataInicio, 'Data de inicio obrigatorio')
    Validator.isNotNull(dataFim, 'Data de fim obrigatorio')
    Validator.isNotNull(medicoId, 'medicoId obrigatorio')
    Validator.isNotNull(pacienteId, 'pacienteId obrigatorio')
    Validator.isNotNull(status, 'Status obrigatorio')
    Validator.isGreaterThan(dataFim, dataInicio, 'Data inicial deve ser anterior a data final')
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
