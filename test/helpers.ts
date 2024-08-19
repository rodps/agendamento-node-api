import { type Usuario } from '../src/application/entity/usuario.entity'
import db from '../src/db'
import { makeJwtService } from '../src/main/factories/infrastructure-services.factory'
import { createUsuario } from './db-factory'

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

export class TestUser {
  public static instance: TestUser | null = null

  private constructor (
    private readonly usuario: Usuario,
    private readonly jwtService = makeJwtService()
  ) {}

  public static async create (): Promise<TestUser> {
    if (TestUser.instance === null) {
      TestUser.instance = new TestUser(await createUsuario())
    }
    return TestUser.instance
  }

  public getAuthToken (): string {
    return this.jwtService.generateToken(this.usuario)
  }
}
