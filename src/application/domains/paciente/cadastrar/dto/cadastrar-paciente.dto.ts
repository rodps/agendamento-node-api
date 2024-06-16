import { ApplicationError } from '../../../../errors/application.error'

interface CadastrarPacienteParams {
  nome: string
  telefone: string
  cpf: string
  dataNascimento: string
}

export class CadastrarPacienteDto {
  readonly nome: string
  readonly telefone: string
  readonly cpf: string
  readonly dataNascimento: string

  constructor ({ nome, telefone, cpf, dataNascimento }: CadastrarPacienteParams) {
    if (nome === undefined || nome.length === 0) {
      throw new ApplicationError('Nome obrigatorio')
    }

    if (telefone === undefined || telefone.length === 0) {
      throw new ApplicationError('Telefone obrigatorio')
    }

    if (cpf === undefined || cpf.length === 0) {
      throw new ApplicationError('CPF obrigatorio')
    }

    if (dataNascimento === undefined || dataNascimento.length === 0) {
      throw new ApplicationError('Data de nascimento obrigatorio')
    }

    if (!/^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})$/.test(dataNascimento)) {
      throw new ApplicationError('Data de nascimento invalida')
    }

    this.nome = nome
    this.telefone = telefone
    this.cpf = cpf
    this.dataNascimento = dataNascimento
  }
}
