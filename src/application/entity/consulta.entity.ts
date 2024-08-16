import { type ConsultaDto } from '../dto/consulta/consulta.dto'
import { isGreaterThan, isNotNull } from '../utils/validator'
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
    isNotNull(dataInicio, 'Data de inicio obrigatorio')
    isNotNull(dataFim, 'Data de fim obrigatorio')
    isNotNull(medicoId, 'medicoId obrigatorio')
    isNotNull(pacienteId, 'pacienteId obrigatorio')
    isNotNull(status, 'Status obrigatorio')
    isGreaterThan(dataFim, dataInicio, 'Data inicial deve ser anterior a data final')
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
