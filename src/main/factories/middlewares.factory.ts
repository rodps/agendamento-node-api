import { AuthMiddleware } from '../../express/middlewares/authentication.middleware'
import { makeAuthService } from './application-services.factory'

export const makeAuthMiddleware = (): AuthMiddleware => {
  return new AuthMiddleware(makeAuthService())
}
