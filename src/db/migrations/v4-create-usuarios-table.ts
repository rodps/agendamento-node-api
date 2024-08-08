import db from '../index'

const up = async (): Promise<void> => {
  await db.query(`
            CREATE TABLE IF NOT EXISTS usuarios (
                    id INT NOT NULL AUTO_INCREMENT,
                    nome VARCHAR(255) NOT NULL,
                    email VARCHAR(255) NOT NULL,
                    password VARCHAR(255) NOT NULL,
                    role VARCHAR(255) NOT NULL,
                    PRIMARY KEY (id)
            )
    `)
}

const down = async (): Promise<void> => {
  await db.query('DROP TABLE IF EXISTS usuarios')
}

export const createUsuariosTable = { up, down, version: 4, name: 'create usuarios table' }
