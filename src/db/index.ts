import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: process.env.NODE_ENV === 'test' ? 'consultas_api_test' : 'consultas_api'
})

export default pool
