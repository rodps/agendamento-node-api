import { type ResultSetHeader, type RowDataPacket } from 'mysql2'
import { type CadastrarPacienteDto } from '../application/domain/paciente/cadastrar/dto/cadastrar-paciente.dto'
import db from '../db'
import { type IPacienteRepository } from '../application/repository/paciente-repository.interface'
import { Paciente } from '../application/entity/paciente.entity'

export class PacienteRepository implements IPacienteRepository {
  async insert (paciente: CadastrarPacienteDto): Promise<Paciente> {
    const [result] = await db.query<ResultSetHeader>(
      'INSERT INTO pacientes (nome, telefone, cpf, data_nascimento) VALUES (?, ?, ?, ?)',
      [paciente.nome, paciente.telefone, paciente.cpf, paciente.dataNascimento]
    )

    const [rows] = await db.query<RowDataPacket[]>(
      'SELECT * from pacientes WHERE id = ?',
      [result.insertId]
    )
    const pacienteRow = rows[0]

    return new Paciente(
      pacienteRow.id as number,
      pacienteRow.nome as string,
      pacienteRow.telefone as string,
      pacienteRow.cpf as string,
      new Date(pacienteRow.data_nascimento as string).toISOString().substring(0, 10)
    )
  }

  async buscarPorCpf (cpf: string): Promise<Paciente[]> {
    const [rows] = await db.query<RowDataPacket[]>(
      'SELECT * from pacientes WHERE cpf = ?',
      [cpf]
    )
    return rows.map((row) => (
      new Paciente(
        row.id as number,
        row.nome as string,
        row.telefone as string,
        row.cpf as string,
        row.data_nascimento as string
      )
    ))
  }

  async buscarPorId (id: number): Promise<Paciente | null> {
    const [rows] = await db.query<RowDataPacket[]>(
      'SELECT * from pacientes WHERE id = ?',
      [id]
    )
    if (rows.length === 0) {
      return null
    }
    const pacienteRow = rows[0]
    return new Paciente(
      pacienteRow.id as number,
      pacienteRow.nome as string,
      pacienteRow.telefone as string,
      pacienteRow.cpf as string,
      pacienteRow.data_nascimento as string
    )
  }
}
