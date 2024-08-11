/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { createAuthController } from '../../../main/factories/express/controller.factory'

const authRouter = Router()
const controller = createAuthController()

authRouter.post('/auth/login', controller.login)

export { authRouter }
