import { type PacienteDtoRequest } from '../dto/paciente/paciente.dto'
import { isNotEmpty } from '../utils/validator'
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
    isNotEmpty(nome, 'Nome obrigatorio')
    isNotEmpty(telefone, 'Telefone obrigatorio')
    isNotEmpty(cpf, 'CPF obrigatorio')
    isNotEmpty(dataNascimento, 'Data de nascimento obrigatorio')
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
