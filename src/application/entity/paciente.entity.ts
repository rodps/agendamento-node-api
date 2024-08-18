import { type PacienteDto } from '../dto/paciente/paciente.dto'
import { ApplicationEntity } from './_application.entity'
import { guard } from '../utils/guard'

export class Paciente extends ApplicationEntity {
  constructor (
    readonly id: number | null,
    readonly nome: string,
    readonly telefone: string,
    readonly cpf: string,
    readonly dataNascimento: string
  ) {
    super(id)
    guard(nome, 'Nome obrigatorio')
    guard(telefone, 'Telefone obrigatorio')
    guard(cpf, 'CPF obrigatorio')
    guard(dataNascimento, 'Data de nascimento obrigatorio')
  }

  static from (dto: PacienteDto): Paciente {
    return new Paciente(
      null,
      dto.nome,
      dto.telefone,
      dto.cpf,
      dto.dataNascimento
    )
  }
}
