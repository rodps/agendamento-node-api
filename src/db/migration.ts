import fs from 'fs'
import db from './index'
import { type RowDataPacket } from 'mysql2'
import { glob } from 'glob'
import path from 'path'

const dirname = path.join(__dirname, 'migrations')

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

async function runMigration (version: number): Promise<void> {
  const globPattern = `${dirname}/v${version}-*.sql`
  const files = glob.sync(globPattern)

  if (files.length === 0) {
    throw new Error('Migration v' + version + ' não encontrada')
  }

  if (files.length > 1) {
    throw new Error('Mais de uma migration v' + version + ' encontrada')
  }

  const path = files[0]
  console.log(`Executando migration v${version}: ${path}`)
  const content = fs.readFileSync(path, 'utf-8')
  await db.query(content)
  await insertMigration(path, version)
  console.log(`Migration v${version} concluída`)
}

async function runMigrations (): Promise<void> {
  await initMigrationDatabase()
  const latestVersion = await getLatestVersion()
  console.log(`Versão atual: ${latestVersion}`)
  console.log('Diretório de migrations: ' + dirname)
  const migrationCount = fs.readdirSync(dirname).length
  console.log(`Total de migrations encontradas: ${migrationCount}`)

  if (latestVersion >= migrationCount) {
    console.log('Nenhuma migration a ser executada.')
    await closeConnection()
    return
  }

  for (let i: number = latestVersion; i < migrationCount; i++) {
    await runMigration(i + 1)
    console.log(`Migrations concluídas: ${i + 1}/${migrationCount}`)
  }
  await closeConnection()
  console.log('Fim')
}

async function closeConnection (): Promise<void> {
  (await db.getConnection()).destroy()
}

void runMigrations()
