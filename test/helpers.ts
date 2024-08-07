import db from '../src/db'
import { UsuarioDtoRequest } from '../src/application/dto/usuario/usuario.dto'
import { AuthFactory } from '../src/express/factories/auth.factory'
import { UsuariosFactory } from '../src/express/factories/usuarios.factory'

export const isTestEnv = (): void => {
  if (process.env.NODE_ENV !== 'test') {
    throw new Error('NODE_ENV must be "test"')
  }
}

export const deleteAllFromTable = async (tableName: string): Promise<void> => {
  isTestEnv()
  await db.query('DELETE FROM ' + tableName)
  await db.query('ALTER TABLE ' + tableName + ' AUTO_INCREMENT = 1')
}

export const closeDbConnection = async (): Promise<void> => {
  isTestEnv()
  await db.end()
}

export const getAuthToken = async (): Promise<string> => {
  isTestEnv()
  const authService = new AuthFactory().createAuthService()
  const usuarioService = new UsuariosFactory().createUsuarioService()

  const usuario = await usuarioService.buscarPorEmail('testuser_123@test.com')
  if (usuario == null) {
    await usuarioService.cadastrar(
      new UsuarioDtoRequest('test', 'testuser_123@test.com', '12345678')
    )
  }
  const token = await authService.login('testuser_123@test.com', '12345678')

  return token
}
