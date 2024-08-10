/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { auth } from '../../middlewares/authentication.middleware'
import { AuthFactory } from './auth.factory'

const authRouter = Router()

const controller = new AuthFactory().createAuthController()

authRouter.post('/auth/login', auth, controller.login)

export { authRouter }
