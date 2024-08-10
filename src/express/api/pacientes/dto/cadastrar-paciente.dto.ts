import { z } from 'zod'
import { PacienteDtoRequest } from '../../../../application/dto/paciente/paciente.dto'

export class CadastrarPacienteDto extends PacienteDtoRequest {
  constructor (body: any) {
    const data = z.object({
      nome: z.string().min(3),
      telefone: z.string().min(8),
      cpf: z.string().min(11),
      dataNascimento: z.string().date()
    }).parse(body)

    super(data.nome, data.telefone, data.cpf, data.dataNascimento)
  }
}
