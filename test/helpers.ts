import db from '../src/db'

const checkNodeEnv = (): void => {
  if (process.env.NODE_ENV !== 'test') {
    throw new Error('NODE_ENV must be "test"')
  }
}

export const deleteMedicosTable = async (): Promise<void> => {
  checkNodeEnv()
  await db.query('DELETE FROM medicos')
}

export const closeDbConnection = async (): Promise<void> => {
  checkNodeEnv()
  await db.end()
}
