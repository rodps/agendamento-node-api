import db from '../index'

export const seedMedicos = async (): Promise<void> => {
  const medicos = [
    {
      nome: 'Dr. Fulano',
      crm: '123456',
      especialidade: 'Cardiologista'
    },
    {
      nome: 'Dr. Beltrano',
      crm: '654321',
      especialidade: 'Neurologista'
    },
    {
      nome: 'Dr. Cicrano',
      crm: '987654',
      especialidade: 'Pediatria'
    }
  ]
  for (const medico of medicos) {
    await db.query(
      'INSERT INTO medicos (nome, crm, especialidade) VALUES (?, ?, ?)',
      [medico.nome, medico.crm, medico.especialidade]
    )
  }
}
