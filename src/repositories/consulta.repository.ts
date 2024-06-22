import { type RowDataPacket, type ResultSetHeader } from 'mysql2'
import db from '../db'
import { type IConsultaRepository } from '../application/repository/consulta-repository.interface'
import { Consulta } from '../application/entity/consulta.entity'

interface ConsultaRowDataPacket extends RowDataPacket, Consulta {}

export class ConsultaRepository implements IConsultaRepository {
  async buscarPorData (dataInicio: Date, dataFim: Date): Promise<Consulta[]> {
    const sql = db.format(
      'SELECT * from consultas WHERE dataInicio >= ? AND dataFim <= ?',
      [dataInicio, dataFim]
    )
    const [rows] = await db.query<ConsultaRowDataPacket[]>(sql)
    return rows.map((row) => new Consulta(row.id, row.dataInicio, row.dataFim, row.medicoId, row.pacienteId, row.status))
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

    return new Consulta(rows[0].id, rows[0].dataInicio, rows[0].dataFim, rows[0].medicoId, rows[0].pacienteId, rows[0].status)
  }
}
