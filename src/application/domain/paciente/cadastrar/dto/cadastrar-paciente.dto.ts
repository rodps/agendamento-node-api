import { z } from 'zod'
import { ValidationError } from '../../../../errors/validation.error'

export class CadastrarPacienteDto {
  readonly nome: string
  readonly telefone: string
  readonly cpf: string
  readonly dataNascimento: string

  constructor (data: any) {
    const result = z.object({
      nome: z.string().min(3),
      telefone: z.string().min(8),
      cpf: z.string().min(11),
      dataNascimento: z.string().date()
    }).safeParse(data)

    if (!result.success) {
      throw new ValidationError(result.error.issues)
    }

    this.nome = result.data.nome
    this.telefone = result.data.telefone
    this.cpf = result.data.cpf
    this.dataNascimento = result.data.dataNascimento
  }
}
