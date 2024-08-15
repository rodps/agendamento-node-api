import { UserRole, Usuario } from '../../../src/application/entity/usuario.entity'
import { UsuarioRepository } from '../../../src/infrastructure/repositories/usuario.repository'
import db from '../../../src/db'
import { type RowDataPacket, type ResultSetHeader } from 'mysql2'
import { closeDbConnection } from '../../helpers'

describe('Usuario Repository', () => {
  const sut = new UsuarioRepository()

  beforeEach(async () => {
    await db.query('TRUNCATE TABLE usuarios')
  })

  afterAll(async () => {
    await closeDbConnection()
  })

  describe('buscarPorId', () => {
    it('deve retornar um usuário', async () => {
      // arrange
      await db.query<ResultSetHeader>(
        'INSERT INTO usuarios (nome, password, email, role) VALUES (?, ?, ?, ?)',
        ['nome', '12345678', 'email@test.com', UserRole.ADMIN]
      )

      // act
      const result = await sut.buscarPorId(1)

      // assert
      expect(result).toEqual(
        new Usuario(1, 'nome', '12345678', 'email@test.com', UserRole.ADMIN)
      )
    })

    it('deve retornar null se o usuário não existir', async () => {
      // arrange

      // act
      const result = await sut.buscarPorId(1)

      // assert
      expect(result).toBeNull()
    })
  })

  describe('buscarPorEmail', () => {
    it('deve retornar um usuário', async () => {
      // arrange
      await db.query<ResultSetHeader>(
        'INSERT INTO usuarios (nome, password, email, role) VALUES (?, ?, ?, ?)',
        ['nome', '12345678', 'email@test.com', UserRole.ADMIN]
      )

      // act
      const result = await sut.buscarPorEmail('email@test.com')

      // assert
      expect(result).toEqual(
        new Usuario(1, 'nome', '12345678', 'email@test.com', UserRole.ADMIN)
      )
    })

    it('deve retornar null se o usuário não existir', async () => {
      // arrange

      // act
      const result = await sut.buscarPorEmail('email@test.com')

      // assert
      expect(result).toBeNull()
    })
  })

  describe('insert', () => {
    it('deve inserir um usuário', async () => {
      // arrange
      const usuario = new Usuario(null, 'nome', '12345678', 'email@test.com', UserRole.ADMIN)

      // act
      const result = await sut.insert(usuario)

      // assert
      expect(result).toEqual(
        new Usuario(1, 'nome', '12345678', 'email@test.com', UserRole.ADMIN)
      )

      const [rows] = await db.query<RowDataPacket[]>('SELECT * FROM usuarios')
      expect(rows).toHaveLength(1)
      expect(rows[0].nome).toBe('nome')
      expect(rows[0].password).toBe('12345678')
      expect(rows[0].email).toBe('email@test.com')
      expect(rows[0].role).toBe(UserRole.ADMIN)
    })
  })
})
