import db from '../index'

const up = async (): Promise<void> => {
  await db.query(`
        CREATE TABLE IF NOT EXISTS medicos (
            id INT NOT NULL AUTO_INCREMENT,
            nome VARCHAR(255) NOT NULL,
            crm VARCHAR(255) NOT NULL,
            especialidade VARCHAR(255) NOT NULL,
            PRIMARY KEY (id)
        )
    `)
}

const down = async (): Promise<void> => {
  await db.query('DROP TABLE IF EXISTS medicos')
}

export const createMedicosTable = { up, down, version: 1, name: 'create medicos table' }
