import { type PacienteDtoRequest } from '../dto/paciente/paciente.dto'
import { Validator } from '../utils/validator'
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
    Validator.isNotEmpty(nome, 'Nome obrigatorio')
    Validator.isNotEmpty(telefone, 'Telefone obrigatorio')
    Validator.isNotEmpty(cpf, 'CPF obrigatorio')
    Validator.isNotEmpty(dataNascimento, 'Data de nascimento obrigatorio')
  }

  static from (dto: PacienteDtoRequest): Paciente {
    return new Paciente(
      null,
      dto.nome,
      dto.telefone,
      dto.cpf,
      dto.dataNascimento
    )
  }
}
