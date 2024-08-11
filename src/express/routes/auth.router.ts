import { Router } from 'express'
import { toExpressHandler } from '../../main/adapters/express/adapt-controller'
import { AuthFactory } from '../../main/factories/auth.factory'

const authRouter = Router()
const controller = AuthFactory.createAuthController()

authRouter
  .post('/auth/login', toExpressHandler(controller.login))

export { authRouter }
