import { type Paciente } from '../../paciente.entity'

export class CadastrarPacienteResponseDto {
  readonly id: number
  readonly nome: string
  readonly telefone: string
  readonly cpf: string
  readonly dataNascimento: string

  constructor (paciente: Paciente) {
    this.id = paciente.id
    this.nome = paciente.nome
    this.telefone = paciente.telefone
    this.cpf = paciente.cpf
    this.dataNascimento = paciente.dataNascimento
  }
}
