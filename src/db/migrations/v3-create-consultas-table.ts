import db from '../index'

const up = async (): Promise<void> => {
  await db.query(`
        CREATE TABLE IF NOT EXISTS consultas (
                id INT NOT NULL AUTO_INCREMENT,
                pacienteId INT NOT NULL,
                medicoId INT NOT NULL,
                dataInicio DATETIME NOT NULL,
                dataFim DATETIME NOT NULL,
                status VARCHAR(255) NOT NULL,
                PRIMARY KEY (id),
                FOREIGN KEY (pacienteId) REFERENCES pacientes(id) ON DELETE CASCADE,
                FOREIGN KEY (medicoId) REFERENCES medicos(id) ON DELETE CASCADE
        )
    `)
}

const down = async (): Promise<void> => {
  await db.query('DROP TABLE IF EXISTS consultas')
}

export const createConsultasTable = { up, down, version: 3, name: 'create consultas table' }
