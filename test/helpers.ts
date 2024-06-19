import db from '../src/db'

export const checkNodeEnv = (): void => {
  if (process.env.NODE_ENV !== 'test') {
    throw new Error('NODE_ENV must be "test"')
  }
}

export const deleteAllFromTable = async (tableName: string): Promise<void> => {
  checkNodeEnv()
  await db.query('DELETE FROM ' + tableName)
  await db.query('ALTER TABLE ' + tableName + ' AUTO_INCREMENT = 1')
}

export const closeDbConnection = async (): Promise<void> => {
  checkNodeEnv()
  await db.end()
}
