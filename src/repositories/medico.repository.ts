import { type ResultSetHeader, type RowDataPacket } from 'mysql2'
import { type CadastrarMedicoDto } from '../application/domains/medico/cadastrar/dto/cadastrar-medico.dto'
import { type Medico } from '../application/domains/medico/medico.entity'
import { type IMedicoRepository } from '../application/domains/medico/repository.interface'
import db from '../db'

interface MedicoRowDataPacket extends Medico, RowDataPacket {}

export class MedicoRepository implements IMedicoRepository {
  async insert (medico: CadastrarMedicoDto): Promise<Medico> {
    const [result] = await db.query<ResultSetHeader>(
      'INSERT into medicos (nome, crm, especialidade) VALUES (?, ?, ?)',
      [medico.nome, medico.crm, medico.especialidade]
    )

    const [rows] = await db.query<MedicoRowDataPacket[]>(
      'SELECT * from medicos WHERE id = ?',
      [result.insertId]
    )

    return rows[0]
  }

  async buscarPorCrm (crm: string): Promise<Medico[]> {
    const [rows] = await db.query<MedicoRowDataPacket[]>(
      'SELECT * from medicos WHERE crm = ?',
      [crm]
    )
    return rows
  }
}
