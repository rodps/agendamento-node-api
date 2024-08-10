import { z } from 'zod'
import { LoginDtoRequest } from '../../../../application/dto/auth/login.dto'

export class LoginDto extends LoginDtoRequest {
  constructor (body: any) {
    const data = z.object({
      email: z.string(),
      password: z.string()
    }).parse(body)

    super(data.email, data.password)
  }
}
