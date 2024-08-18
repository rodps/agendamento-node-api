import { type MedicoDto } from '../dto/medico/medico.dto'
import { guard } from '../utils/guard'
import { ApplicationEntity } from './_application.entity'

export class Medico extends ApplicationEntity {
  constructor (
    readonly id: number | null,
    readonly nome: string,
    readonly crm: string,
    readonly especialidade: string
  ) {
    super(id)
    guard(nome, 'Nome obrigatorio')
    guard(crm, 'CRM obrigatorio')
    guard(especialidade, 'Especialidade obrigatorio')
  }

  static from (dto: MedicoDto): Medico {
    return new Medico(null, dto.nome, dto.crm, dto.especialidade)
  }
}
