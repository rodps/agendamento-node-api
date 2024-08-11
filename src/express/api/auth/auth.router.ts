/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { AuthFactory } from '../../factories/auth.factory'

const authRouter = Router()

const controller = AuthFactory.createAuthController()

authRouter.post('/auth/login', controller.login)

export { authRouter }
