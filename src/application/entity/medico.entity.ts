import { ApplicationEntity } from './_application.entity'

export class Medico extends ApplicationEntity {
  constructor (
    readonly id: number | null,
    readonly nome: string,
    readonly crm: string,
    readonly especialidade: string
  ) {
    super(id)
    if (this.nome === undefined || this.nome.length === 0) {
      throw new Error('Nome obrigatorio')
    }
    if (this.crm === undefined || this.crm.length === 0) {
      throw new Error('CRM obrigatorio')
    }
    if (this.especialidade === undefined || this.especialidade.length === 0) {
      throw new Error('Especialidade obrigatorio')
    }
  }
}
