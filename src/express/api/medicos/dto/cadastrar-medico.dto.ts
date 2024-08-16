import { z } from 'zod'
import { type MedicoDto } from '../../../../application/dto/medico/medico.dto'

export class CadastrarMedicoDto implements MedicoDto {
  nome: string
  crm: string
  especialidade: string

  constructor (body: any) {
    const data = z.object({
      nome: z.string().min(3),
      crm: z.string().min(6),
      especialidade: z.string().min(3)
    }).parse(body)

    this.nome = data.nome
    this.crm = data.crm
    this.especialidade = data.especialidade
  }
}
