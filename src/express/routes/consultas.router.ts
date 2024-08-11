import { Router } from 'express'
import { ConsultasFactory } from '../../main/factories/consultas.factory'
import { toExpressHandler } from '../../main/adapters/express/adapt-controller'
import { AuthFactory } from '../../main/factories/auth.factory'
import { toExpressMiddleware } from '../../main/adapters/express/adapt-middleware'

const consultasRouter = Router()
const controller = ConsultasFactory.createConsultasController()
const auth = AuthFactory.createAuthMiddleware()

consultasRouter
  .post('/consultas', toExpressMiddleware(auth), toExpressHandler(controller.agendar))

export { consultasRouter }
