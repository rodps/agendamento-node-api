import { z } from 'zod'
import { ValidationError } from '../../../../errors/validation.error'

export class CadastrarMedicoDto {
  readonly nome: string
  readonly crm: string
  readonly especialidade: string

  constructor (data: any) {
    const result = z.object({
      nome: z.string().min(3),
      crm: z.string().min(6),
      especialidade: z.string().min(3)
    }).safeParse(data)

    if (!result.success) {
      throw new ValidationError(result.error.issues)
    }
    this.nome = result.data.nome
    this.crm = result.data.crm
    this.especialidade = result.data.especialidade
  }
}
