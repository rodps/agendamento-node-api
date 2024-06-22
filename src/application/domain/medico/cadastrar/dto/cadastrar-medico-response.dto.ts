import { type Medico } from '../../../../entity/medico.entity'

export class CadastrarMedicoResponseDto {
  readonly id: number
  readonly nome: string
  readonly crm: string
  readonly especialidade: string

  constructor (medico: Medico) {
    this.id = medico.getIdOrThrow()
    this.nome = medico.nome
    this.crm = medico.crm
    this.especialidade = medico.especialidade
  }
}
