import { AuthMiddleware } from '../../express/middlewares/authentication.middleware'
import { createAuthService } from './application-services.factory'

export const createAuthMiddleware = (): AuthMiddleware => {
  return new AuthMiddleware(createAuthService())
}
