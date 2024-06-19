import { type RowDataPacket, type ResultSetHeader } from 'mysql2'
import { type Consulta } from '../application/domains/consulta/consulta.entity'
import { type IConsultaRepository } from '../application/domains/consulta/repository.interface'
import db from '../db'

interface ConsultaRowDataPacket extends RowDataPacket, Consulta {}

export class ConsultaRepository implements IConsultaRepository {
  async buscarPorData (dataInicio: Date, dataFim: Date): Promise<Consulta[]> {
    const sql = db.format(
      'SELECT * from consultas WHERE dataInicio >= ? AND dataFim <= ?',
      [dataInicio, dataFim]
    )
    const [rows] = await db.query<ConsultaRowDataPacket[]>(sql)
    return rows
  }

  async insert (consulta: Consulta): Promise<Consulta> {
    const sql = db.format(
      'INSERT into consultas (dataInicio, dataFim, medicoId, pacienteId, status) VALUES (?, ?, ?, ?, ?)',
      [
        consulta.dataInicio,
        consulta.dataFim,
        consulta.medicoId,
        consulta.pacienteId,
        consulta.status
      ]
    )
    const [result] = await db.query<ResultSetHeader>(sql)
    const [rows] = await db.query<ConsultaRowDataPacket[]>(
      'SELECT * from consultas WHERE id = ?',
      [result.insertId]
    )

    return rows[0]
  }
}
