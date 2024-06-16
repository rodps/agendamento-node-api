import { type ResultSetHeader, type RowDataPacket } from 'mysql2'
import { type CadastrarPacienteDto } from '../application/domains/paciente/cadastrar/dto/cadastrar-paciente.dto'
import { type Paciente } from '../application/domains/paciente/paciente.entity'
import { type IPacienteRepository } from '../application/domains/paciente/repository.interface'
import db from '../db'

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

    return {
      id: pacienteRow.id,
      nome: pacienteRow.nome,
      telefone: pacienteRow.telefone,
      cpf: pacienteRow.cpf,
      dataNascimento: pacienteRow.data_nascimento
    }
  }

  async buscarPorCpf (cpf: string): Promise<Paciente[]> {
    const [rows] = await db.query<RowDataPacket[]>(
      'SELECT * from pacientes WHERE cpf = ?',
      [cpf]
    )
    return rows.map((row) => ({
      id: row.id,
      nome: row.nome,
      telefone: row.telefone,
      cpf: row.cpf,
      dataNascimento: row.data_nascimento
    }))
  }
}
