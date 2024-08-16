import db from '../src/db'
import { createAuthService } from '../src/main/factories/application-services.factory'
import { createUsuarioRepository } from '../src/main/factories/repositories.factory'

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
  const authService = createAuthService()
  const usuarioRepository = createUsuarioRepository()

  const usuario = await usuarioRepository.buscarPorEmail('testuser_123@test.com')
  if (usuario == null) {
    await authService.cadastrar({
      email: 'testuser_123@test.com',
      nome: 'testuser_123',
      password: '12345678'
    })
  }
  const { token } = await authService.login({ email: 'testuser_123@test.com', password: '12345678' })

  return token
}
