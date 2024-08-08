import db from '../src/db'
import { type AuthService } from '../src/application/services/auth.service'
import { type UsuarioService } from '../src/application/services/usuario.service'
import { UsuarioDtoRequest } from '../src/application/dto/usuario/usuario.dto'

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

export const getAuthToken = async (authService: AuthService, usuarioService: UsuarioService): Promise<string> => {
  isTestEnv()
  const usuario = await usuarioService.buscarPorEmail('testuser_123@test.com')
  if (usuario == null) {
    await usuarioService.cadastrar(
      new UsuarioDtoRequest('test', 'testuser_123@test.com', '12345678')
    )
  }
  const token = await authService.login('testuser_123@test.com', '12345678')

  return token
}
