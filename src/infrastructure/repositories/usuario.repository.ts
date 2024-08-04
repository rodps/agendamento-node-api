import { type ResultSetHeader, type RowDataPacket } from 'mysql2'
import { Usuario } from '../../application/entity/usuario.entity'
import { type IUsuarioRepository } from '../../application/interfaces/repository.interface'
import db from '../../db'

type UsuarioDataPacket = Usuario & RowDataPacket

export class UsuarioRepository implements IUsuarioRepository {
  async buscarPorId (id: number): Promise<Usuario | null> {
    const [result] = await db.query<UsuarioDataPacket[]>(
      'SELECT * from usuarios WHERE id = ?',
      [id]
    )

    if (result.length === 0) {
      return null
    }

    return new Usuario(
      result[0].id,
      result[0].nome,
      result[0].password,
      result[0].email,
      result[0].role
    )
  }

  async buscarPorEmail (email: string): Promise<Usuario | null> {
    const [result] = await db.query<UsuarioDataPacket[]>(
      'SELECT * from usuarios WHERE email = ?',
      [email]
    )

    if (result.length === 0) {
      return null
    }

    return new Usuario(
      result[0].id,
      result[0].nome,
      result[0].password,
      result[0].email,
      result[0].role
    )
  }

  async insert (usuario: Usuario): Promise<Usuario> {
    const [result] = await db.query<ResultSetHeader>(
      'INSERT INTO usuarios (nome, password, email, role) VALUES (?, ?, ?, ?)',
      [usuario.nome, usuario.password, usuario.email, usuario.role]
    )

    const [rows] = await db.query<UsuarioDataPacket[]>(
      'SELECT * from usuarios WHERE id = ?',
      [result.insertId]
    )

    return new Usuario(
      rows[0].id,
      rows[0].nome,
      rows[0].password,
      rows[0].email,
      rows[0].role
    )
  }
}
