import db from '../index'

export const seedPacientes = async (): Promise<void> => {
  const pacientes = [
    {
      nome: 'Paciente 1',
      telefone: '123456789',
      cpf: '123456789',
      data_nascimento: '1990-01-01'
    },
    {
      nome: 'Paciente 2',
      telefone: '987654321',
      cpf: '987654321',
      data_nascimento: '1995-05-05'
    },
    {
      nome: 'Paciente 3',
      telefone: '123123123',
      cpf: '123123123',
      data_nascimento: '2000-01-01'
    }
  ]
  for (const paciente of pacientes) {
    await db.query(
      'INSERT INTO pacientes (nome, cpf, telefone, data_nascimento) VALUES (?, ?, ?, ?)',
      [paciente.nome, paciente.cpf, paciente.telefone, paciente.data_nascimento]
    )
  }
}
