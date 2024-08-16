import { z } from 'zod'
import { type LoginDto } from '../../../../application/dto/auth/login.dto'

export class LoginDtoRequest implements LoginDto {
  email: string
  password: string

  constructor (body: any) {
    const data = z.object({
      email: z.string(),
      password: z.string()
    }).parse(body)

    this.email = data.email
    this.password = data.password
  }
}
