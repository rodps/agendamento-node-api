import db from '../index'

const up = async (): Promise<void> => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS pacientes (
        id INT NOT NULL AUTO_INCREMENT,
        nome VARCHAR(255) NOT NULL,
        cpf VARCHAR(255) NOT NULL,
        telefone VARCHAR(255) NOT NULL,
        data_nascimento DATE NOT NULL,
        PRIMARY KEY (id)
    )
  `)
}

const down = async (): Promise<void> => {
  await db.query('DROP TABLE IF EXISTS pacientes')
}

export const createPacientesTable = { up, down, version: 2, name: 'create pacientes table' }
