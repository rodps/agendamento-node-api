import { type ConsultaDto } from '../dto/consulta/consulta.dto'
import { ApplicationEntity } from './_application.entity'
import { guard } from '../utils/guard'

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
    guard(dataInicio, 'Data de inicio obrigatorio')
    guard(dataFim, 'Data de fim obrigatorio')
    guard(medicoId, 'medicoId obrigatorio')
    guard(pacienteId, 'pacienteId obrigatorio')
    guard(status, 'Status obrigatorio')
    guard(dataInicio < dataFim, 'Data inicial deve ser anterior a data final')
  }

  static from (dto: ConsultaDto): Consulta {
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
