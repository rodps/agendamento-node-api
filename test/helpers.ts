import db from '../src/db'

const checkNodeEnv = (): void => {
  if (process.env.NODE_ENV !== 'test') {
    throw new Error('NODE_ENV must be "test"')
  }
}

export const truncateTable = async (tableName: string): Promise<void> => {
  checkNodeEnv()
  await db.query('TRUNCATE TABLE ' + tableName)
}

export const closeDbConnection = async (): Promise<void> => {
  checkNodeEnv()
  await db.end()
}
