import { z } from 'zod'
import { UsuarioDtoRequest } from '../../../../application/dto/usuario/usuario.dto'

export class CadastrarUsuarioDto extends UsuarioDtoRequest {
  constructor (body: any) {
    const data = z.object({
      nome: z.string().min(3),
      email: z.string().email(),
      password: z.string().min(8)
    }).parse(body)

    super(data.nome, data.email, data.password)
  }
}
