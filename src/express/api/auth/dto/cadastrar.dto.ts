import { z } from 'zod'
import { type CadastrarDto } from '../../../../application/dto/auth/cadastrar.dto'

export class CadastrarDtoRequest implements CadastrarDto {
  nome: string
  email: string
  password: string

  constructor (body: any) {
    const data = z.object({
      nome: z.string().min(3),
      email: z.string().email(),
      password: z.string().min(8)
    }).parse(body)

    this.nome = data.nome
    this.email = data.email
    this.password = data.password
  }
}
