import { type Paciente } from '../../entity/paciente.entity'

export class PacienteDtoRequest {
  constructor (
    readonly nome: string,
    readonly telefone: string,
    readonly cpf: string,
    readonly dataNascimento: string
  ) {}
}

export class PacienteDtoResponse {
  readonly id: number
  readonly nome: string
  readonly telefone: string
  readonly cpf: string
  readonly dataNascimento: string

  constructor (paciente: Paciente) {
    this.id = paciente.getIdOrThrow()
    this.nome = paciente.nome
    this.telefone = paciente.telefone
    this.cpf = paciente.cpf
    this.dataNascimento = paciente.dataNascimento
  }
}
