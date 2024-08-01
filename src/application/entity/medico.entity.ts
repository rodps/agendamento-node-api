import { type MedicoDtoRequest } from '../dto/medico/medico.dto'
import { Validator } from '../utils/validator'
import { ApplicationEntity } from './_application.entity'

export class Medico extends ApplicationEntity {
  constructor (
    readonly id: number | null,
    readonly nome: string,
    readonly crm: string,
    readonly especialidade: string
  ) {
    super(id)
    Validator.isNotEmpty(nome, 'Nome obrigatorio')
    Validator.isNotEmpty(crm, 'CRM obrigatorio')
    Validator.isNotEmpty(especialidade, 'Especialidade obrigatorio')
  }

  static from (dto: MedicoDtoRequest): Medico {
    return new Medico(null, dto.nome, dto.crm, dto.especialidade)
  }
}
