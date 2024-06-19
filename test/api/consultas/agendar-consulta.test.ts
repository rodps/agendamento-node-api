import request from 'supertest'
import app from '../../../src/express/app'
import { closeDbConnection, deleteAllFromTable } from '../../helpers'
import { seedMedicos } from '../../../src/db/seeders/medicos.seeder'
import { seedPacientes } from '../../../src/db/seeders/pacientes.seeder'

describe('Agendar Consulta', () => {
  afterAll(async () => {
    await deleteAllFromTable('consultas')
    await closeDbConnection()
  })

  beforeAll(async () => {
    await deleteAllFromTable('medicos')
    await deleteAllFromTable('pacientes')
    await seedMedicos()
    await seedPacientes()
  })

  beforeEach(async () => {
    await deleteAllFromTable('consultas')
  })

  test('deve retornar 201', async () => {
    const result = await request(app).post('/consultas').send({
      dataInicio: '2022-01-01T00:00:00.000Z',
      dataFim: '2022-01-01T01:00:00.000Z',
      medicoId: 1,
      pacienteId: 1
    })

    expect(result.status).toBe(201)
    expect(result.body.id).toBeDefined()
    expect(result.body.dataInicio).toBe('2022-01-01T00:00:00.000Z')
    expect(result.body.dataFim).toBe('2022-01-01T01:00:00.000Z')
    expect(result.body.medicoId).toBe(1)
    expect(result.body.pacienteId).toBe(1)
    expect(result.body.status).toBe('PENDENTE')
  })

  test('deve retornar 400 quando o medicoId for invalido', async () => {
    const result = await request(app).post('/consultas').send({
      dataInicio: '2022-01-01T00:00:00.000Z',
      dataFim: '2022-01-01T01:00:00.000Z',
      medicoId: 999,
      pacienteId: 999
    })

    expect(result.status).toBe(400)
    expect(result.body.erro).toBe('medicoId não encontrado')
  })

  test('deve retornar 400 quando o pacienteId for invalido', async () => {
    const result = await request(app).post('/consultas').send({
      dataInicio: '2022-01-01T00:00:00.000Z',
      dataFim: '2022-01-01T01:00:00.000Z',
      medicoId: 1,
      pacienteId: 999
    })

    expect(result.status).toBe(400)
    expect(result.body.erro).toBe('pacienteId não encontrado')
  })

  test('deve retornar 400 quando a data de inicio for vazia', async () => {
    const result = await request(app).post('/consultas').send({
      dataFim: '2022-01-01T01:00:00.000Z',
      medicoId: 1,
      pacienteId: 1
    })

    expect(result.status).toBe(400)
    expect(result.body.erro).toBeDefined()
    expect(result.body.erro).toHaveLength(1)
  })

  test('deve retornar 400 quando a data de fim for vazia', async () => {
    const result = await request(app).post('/consultas').send({
      dataInicio: '2022-01-01T00:00:00.000Z',
      medicoId: 1,
      pacienteId: 1
    })

    expect(result.status).toBe(400)
    expect(result.body.erro).toBeDefined()
    expect(result.body.erro).toHaveLength(1)
  })

  test('deve retornar 400 quando a data de inicio for maior que a data de fim', async () => {
    const result = await request(app).post('/consultas').send({
      dataInicio: '2022-01-01T01:00:00.000Z',
      dataFim: '2022-01-01T00:00:00.000Z',
      medicoId: 1,
      pacienteId: 1
    })

    expect(result.status).toBe(400)
    expect(result.body.erro).toBe(
      'Data inicial deve ser anterior a data final'
    )
  })

  test('deve retornar 400 quando o horário estiver indisponível', async () => {
    await request(app).post('/consultas').send({
      dataInicio: '2022-01-01T00:00:00.000Z',
      dataFim: '2022-01-01T01:00:00.000Z',
      medicoId: 1,
      pacienteId: 1
    })

    const result = await request(app).post('/consultas').send({
      dataInicio: '2022-01-01T00:00:00.000Z',
      dataFim: '2022-01-01T01:00:00.000Z',
      medicoId: 1,
      pacienteId: 1
    })

    expect(result.status).toBe(400)
    expect(result.body.erro).toBe('Horário indisponível')
  })
})
