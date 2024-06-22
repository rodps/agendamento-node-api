import { ApplicationEntity } from './_application.entity'

export class Paciente extends ApplicationEntity {
  constructor (
    readonly id: number | null,
    readonly nome: string,
    readonly telefone: string,
    readonly cpf: string,
    readonly dataNascimento: string
  ) {
    super(id)
    if (this.nome === undefined || this.nome.length === 0) {
      throw new Error('Nome obrigatorio')
    }
    if (this.telefone === undefined || this.telefone.length === 0) {
      throw new Error('Telefone obrigatorio')
    }
    if (this.cpf === undefined || this.cpf.length === 0) {
      throw new Error('CPF obrigatorio')
    }
    if (this.dataNascimento === undefined || this.dataNascimento.length === 0) {
      throw new Error('Data de nascimento obrigatorio')
    }
  }
}
