import { z } from 'zod'
import { MedicoDtoRequest } from '../../../../application/dto/medico/medico.dto'

export class CadastrarMedicoDto extends MedicoDtoRequest {
  constructor (body: any) {
    const data = z.object({
      nome: z.string().min(3),
      crm: z.string().min(6),
      especialidade: z.string().min(3)
    }).parse(body)

    super(data.nome, data.crm, data.especialidade)
  }
}
