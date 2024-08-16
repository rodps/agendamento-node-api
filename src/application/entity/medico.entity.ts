import { type MedicoDto } from '../dto/medico/medico.dto'
import { isNotEmpty } from '../utils/validator'
import { ApplicationEntity } from './_application.entity'

export class Medico extends ApplicationEntity {
  constructor (
    readonly id: number | null,
    readonly nome: string,
    readonly crm: string,
    readonly especialidade: string
  ) {
    super(id)
    isNotEmpty(nome, 'Nome obrigatorio')
    isNotEmpty(crm, 'CRM obrigatorio')
    isNotEmpty(especialidade, 'Especialidade obrigatorio')
  }

  static from (dto: MedicoDto): Medico {
    return new Medico(null, dto.nome, dto.crm, dto.especialidade)
  }
}
