import { type ResultSetHeader, type RowDataPacket } from 'mysql2'
import db from '../db'
import { Medico } from '../application/entity/medico.entity'
import { type IMedicoRepository } from '../application/interfaces/repository.interface'

interface MedicoRowDataPacket extends Medico, RowDataPacket {}

export class MedicoRepository implements IMedicoRepository {
  async insert (medico: Medico): Promise<Medico> {
    const [result] = await db.query<ResultSetHeader>(
      'INSERT into medicos (nome, crm, especialidade) VALUES (?, ?, ?)',
      [medico.nome, medico.crm, medico.especialidade]
    )

    const [rows] = await db.query<MedicoRowDataPacket[]>(
      'SELECT * from medicos WHERE id = ?',
      [result.insertId]
    )

    return new Medico(rows[0].id, rows[0].nome, rows[0].crm, rows[0].especialidade)
  }

  async buscarPorCrm (crm: string): Promise<Medico[]> {
    const [rows] = await db.query<MedicoRowDataPacket[]>(
      'SELECT * from medicos WHERE crm = ?',
      [crm]
    )
    return rows
  }

  async buscarPorId (id: number): Promise<Medico | null> {
    const [rows] = await db.query<MedicoRowDataPacket[]>(
      'SELECT * from medicos WHERE id = ?',
      [id]
    )
    return rows.length > 0 ? new Medico(rows[0].id, rows[0].nome, rows[0].crm, rows[0].especialidade) : null
  }
}
