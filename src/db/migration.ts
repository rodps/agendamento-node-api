import db from './index'
import { type RowDataPacket } from 'mysql2'
import { migrations } from './migrations'

async function initMigrationDatabase (): Promise<void> {
  await db.query(`CREATE TABLE IF NOT EXISTS migrations(
        id INT AUTO_INCREMENT PRIMARY KEY,
        migration_name VARCHAR(255) NOT NULL,
        version INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`)
}

async function getLatestVersion (): Promise<number> {
  const [migration] = await db.query<RowDataPacket[]>('SELECT MAX(version) as latest FROM migrations')
  if (migration.length > 0) {
    return migration[0].latest ?? 0
  }
  return 0
}

async function insertMigration (name: string, version: number): Promise<void> {
  try {
    await db.query('INSERT INTO migrations (migration_name, version) values (?, ?)', [name, version])
  } catch (err) {
    throw new Error('Erro ao inserir migration')
  }
}

async function upMigration (version: number): Promise<void> {
  const migration = migrations.find(m => m.version === version)
  if (migration == null) {
    throw new Error('Migration v' + version + ' não encontrada')
  }
  console.log(`Executando migration v${version}: ${migration.name}`)
  await migration.up()
  await insertMigration(migration.name, version)
  console.log(`Migration v${version} concluída`)
}

async function downMigration (version: number): Promise<void> {
  const migration = migrations.find((m) => m.version === version)
  if (migration == null) {
    throw new Error('Migration v' + version + ' não encontrada')
  }
  console.log(`Executando migration v${version}: ${migration.name}`)
  await migration.down()
  console.log(`Migration v${version} concluída`)
}

async function resetMigrations (): Promise<void> {
  await closeConnection()
  await db.query('DROP TABLE IF EXISTS migrations')
  const migrationCount = migrations.length
  console.log(`Total de migrations encontradas: ${migrationCount}`)
  for (let i: number = migrationCount - 1; i >= 0; i--) {
    await downMigration(i + 1)
    console.log(`Migrations excluídas: ${migrationCount - i}/${migrationCount}`)
  }
}

export async function runMigrations (reset = false): Promise<void> {
  if (reset) {
    await resetMigrations()
  }
  await initMigrationDatabase()
  const latestVersion = await getLatestVersion()
  console.log(`Versão atual: ${latestVersion}`)
  const migrationCount = migrations.length
  console.log(`Total de migrations encontradas: ${migrationCount}`)
  for (let i: number = latestVersion; i < migrationCount; i++) {
    await upMigration(i + 1)
    console.log(`Migrations concluídas: ${i + 1}/${migrationCount}`)
  }
  await closeConnection()
}

async function closeConnection (): Promise<void> {
  (await db.getConnection()).destroy()
}

void runMigrations(true)
