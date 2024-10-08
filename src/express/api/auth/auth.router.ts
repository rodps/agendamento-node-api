/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { makeAuthController } from '../../../main/factories/controllers.factory'

const authRouter = Router()
const controller = makeAuthController()

authRouter
  .post('/auth/login', controller.login)
  .post('/auth/register', controller.cadastrar)

export { authRouter }
