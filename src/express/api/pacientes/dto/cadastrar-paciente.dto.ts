import { z } from 'zod'
import { type PacienteDto } from '../../../../application/dto/paciente/paciente.dto'

export class CadastrarPacienteDto implements PacienteDto {
  nome: string
  telefone: string
  cpf: string
  dataNascimento: string

  constructor (body: any) {
    const data = z.object({
      nome: z.string().min(3),
      telefone: z.string().min(8),
      cpf: z.string().min(11),
      dataNascimento: z.string().date()
    }).parse(body)

    this.nome = data.nome
    this.telefone = data.telefone
    this.cpf = data.cpf
    this.dataNascimento = data.dataNascimento
  }
}
