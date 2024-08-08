import mysql from 'mysql2/promise'

export const TEST_DATABASE_NAME = 'consultas_api_test'
export const DATABASE_NAME = 'consultas_api'

const dbConfig = {
  host: process.env.DB_HOST ?? 'localhost',
  user: process.env.DB_USER ?? 'root',
  password: process.env.DB_PASSWORD ?? 'root',
  database:
    process.env.NODE_ENV === 'test' ? TEST_DATABASE_NAME : DATABASE_NAME
}

const pool = mysql.createPool(dbConfig)

export default pool
